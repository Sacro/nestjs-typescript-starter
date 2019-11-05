import * as Joi from '@hapi/joi';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { sync as username } from 'username'; // eslint-disable-line import/named

export interface EnvConfig {
  [key: string]: string;
}

export class ConfigService {
  private readonly environmentConfig: EnvConfig;

  public constructor(filePath: string) {
    const config: EnvConfig = this.readEnvironmentFromFile(filePath);
    this.environmentConfig = this.validateInput(config);
  }

  private readEnvironmentFromFile(filePath: string): EnvConfig {
    if (fs.existsSync(filePath)) {
      return Object.assign(
        dotenv.parse(fs.readFileSync(filePath)),
        process.env,
      );
    } else {
      return process.env;
    }
  }

  /**
   * Ensures all needed variables are set, and returns the validated JavaScript object
   * including the applied default values.
   */
  private validateInput(environmentConfig: EnvConfig): EnvConfig {
    const environmentVarsSchema = Joi.object({
      NODE_ENV: Joi.string()
        .valid('development', 'production', 'test', 'provision')
        .default('production')
        .optional(),

      PORT: Joi.number()
        .default(3000)
        .optional(),

      POSTGRES_USER: Joi.string()
        .default(username())
        .optional(),

      POSTGRES_PASSWORD: Joi.string()
        .default(username())
        .optional(),

      POSTGRES_HOST: Joi.string()
        .default('localhost')
        .optional(),

      POSTGRES_PORT: Joi.number()
        .default(5432)
        .optional(),

      POSTGRES_DB: Joi.string()
        .default(username())
        .optional(),
    }).options({
      abortEarly: false,
      presence: environmentConfig.NODE_ENV === 'test' ? 'optional' : 'required',
      stripUnknown: true,
    });

    const {
      error,
      value: validatedEnvironmentConfig,
    } = environmentVarsSchema.validate(environmentConfig);

    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }

    return validatedEnvironmentConfig;
  }

  public get isDevelopmentEnvironment(): boolean {
    return Boolean(this.environmentConfig.NODE_ENV === 'development');
  }

  public get isProductionEnvironment(): boolean {
    return Boolean(this.environmentConfig.NODE_ENV === 'production');
  }

  public get isTestEnvironment(): boolean {
    return Boolean(this.environmentConfig.NODE_ENV === 'test');
  }

  public get port(): string {
    return this.environmentConfig.PORT;
  }

  /* Custom configuration follows */
  public get postgres(): PostgresConnectionOptions {
    return {
      type: 'postgres',
      username: this.environmentConfig.POSTGRES_USER,
      password: this.environmentConfig.POSTGRES_PASSWORD,
      host: this.environmentConfig.POSTGRES_HOST,
      database: this.environmentConfig.POSTGRES_DB,
    };
  }
}

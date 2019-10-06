import { Logger } from '@nestjs/common';
import { Logger as TypeormLogger } from 'typeorm';

export class TypeormLoggerService implements TypeormLogger {
  public logQuery(
    query: string,
    parameters?: unknown[],
    // _queryRunner?: QueryRunner,
  ): void {
    const sql =
      query +
      (parameters && parameters.length > 0
        ? ' -- PARAMETERS: ' + this.stringifyParameters(parameters)
        : '');
    Logger.log(`query: ${sql}`, 'TypeORM');
  }

  public logQueryError(
    error: string,
    query: string,
    parameters?: unknown[],
    // _queryRunner?: QueryRunner,
  ): void {
    const sql =
      query +
      (parameters && parameters.length > 0
        ? ' -- PARAMETERS: ' + this.stringifyParameters(parameters)
        : '');
    Logger.error(`query failed: ${sql}`, error, 'TypeORM');
  }

  public logQuerySlow(
    time: number,
    query: string,
    parameters?: unknown[],
    // _queryRunner?: QueryRunner,
  ): void {
    const sql =
      query +
      (parameters && parameters.length > 0
        ? ' -- PARAMETERS: ' + this.stringifyParameters(parameters)
        : '');
    Logger.warn(`query is slow: ${sql}`, 'TypeORM');
    Logger.warn(`execution time: ${time}`);
  }

  public logSchemaBuild(
    message: string,
    // _queryRunner?: QueryRunner
  ): void {
    throw new Error(`Method not implemented. Message ${message}`);
  }

  public logMigration(
    message: string,
    // _queryRunner?: QueryRunner
  ): void {
    Logger.log(message, 'TypeORM');
  }

  public log(
    level: 'log' | 'info' | 'warn',
    message: unknown,
    // _queryRunner?: QueryRunner,
  ): void {
    switch (level) {
      case 'log':
        Logger.log(message);
        break;
      case 'info':
        Logger.log(message);
        break;
      case 'warn':
        Logger.warn(message);
        break;
    }
  }

  /**
   * Converts parameters to a string.
   * Sometimes parameters can have circular objects and therefor we are handle this case too.
   */
  protected stringifyParameters(parameters: unknown[]): string | unknown[] {
    try {
      return JSON.stringify(parameters);
    } catch (error) {
      // most probably circular objects in parameters
      return parameters;
    }
  }
}

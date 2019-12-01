default_registry('registry.local:5000')
docker_build(
  'registry.local:5000/nestjs',
  '.',
  live_update=[
    fall_back_on(['package.json', 'yarn.lock']),
    sync('src', '/app/src'),
    run('cd /app && yarn install', trigger='yarn.lock'),
    restart_container()
  ],
  target='dev'
)

allow_k8s_contexts('k3d')
k8s_yaml(['k8s/nestjs.deployment.yaml', 'k8s/nestjs.service.yaml'])

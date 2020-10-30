default_registry('registry.localhost:5000')
docker_build(
  'registry.localhost:5000/nestjs',
  '.',
  live_update=[
    fall_back_on(['package.json', 'yarn.lock']),
    sync('src', '/app/src'),
    run('cd /app && yarn install', trigger='yarn.lock'),
    restart_container()
  ],
  target='dev-source'
)

allow_k8s_contexts('k3d-k3s-default')
k8s_yaml(['k8s/nestjs.deployment.yaml', 'k8s/nestjs.service.yaml'])

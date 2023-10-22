echo "Clearing storage"
minikube ssh 'docker image prune -a -f'
echo "Deploying: $1"
kubectl rollout restart deployment $1
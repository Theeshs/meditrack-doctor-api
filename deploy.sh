echo "enabled minicube docker env"
eval $(minikube docker-env)

echo "building new docker image"
docker build -t doctor-service-api .

echo "appliyng deployment yml"
kubectl apply -f deployment.yaml

echo "removing unused docker containers"
docker container prune -f

echo "removing unused docker images"
docker image prune -f

echo "forwarding port"
nohup kubectl port-forward svc/patient-service-api-service 3001:3001 > port-forward.log 2>&1 &
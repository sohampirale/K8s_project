# Meta2k25 Project
#### Follow these commands to set up and deploy the project.


## Basic Minikube Setup
```
minikube stop
minikube delete
minikube start
```

```
eval $(minikube docker-env)
```

## Frontend Deployment
```
cd Frontend
docker build -t soham/frontend .
kubectl apply -f frontend.yaml 
```

## Backend Deployment
```
docker build -t soham/backend .
kubectl apply -f backend.yaml
kubectl apply -f mongodb.yaml
```

## Port Forwarding for Backend Service
```
kubectl port-forward svc/backend-service 9563:4904
```

## Entering into the mongodb pod
```
kubectl exec -it <mongodb-pod-name> -- bash
mongosh
db.records.find()
```

## Start
```
kubectl get pods
minikube ip
```
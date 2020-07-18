# doturl

## Project setup
```
docker-compose up
```

### Unit testing
Grab container (frontend or backend) id by running `docker ps`. Then:
```
docker exec -ti <CONTAINER-ID> bash
npm test
```

### Develop
Simply start making your changes on the file and the changes will be automatically updated in docker. 

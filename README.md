# Backend for skill collector 


# Install

```bash
npm install
```
# Then run npx prisma generate
```bash
npx prisma generate
```



# Development

```bash
docker-compose -f docker-compose.dev.yml up 
```
- rebuild the containers
```bash
docker-compose -f docker-compose.dev.yml up --build --force-recreate
```


## Shut down compose


```bash
docker-compose -f docker-compose.dev.yml down 
```



# Remove all unused docker images, containers, volumes, and networks
```bash
docker system prune -a -f && docker volume prune
```

```bash
docker stop $(docker ps -aq) && docker rm -v $(docker ps -aq)

```

# Run testing environment

```bash
docker-compose -f docker-compose.test.yml --env-file .env.test up --build --force-recreate
```


- useful links for later usage
[prisma-migrate-deploy-with-docker#add-to-cmd](https://notiz.dev/blog/prisma-migrate-deploy-with-docker#add-to-cmd-%E2%9C%85)  

[dockerized-prisma-postgres-api](https://www.section.io/engineering-education/dockerized-prisma-postgres-api/)  

[typescript express testing](https://dev.to/nathan_sheryak/how-to-test-a-typescript-express-api-with-jest-for-dummies-like-me-4epd)

# Endpoints

- Auth is needed to post results

## GET api/sfia
- returns all skills

## GET api/sfia/:id
- returns single sfia skill by sfiaid

## Post api/auth
- post with hashkey  to get a token 

```
 {
    "hashkey": "123"
 }
```
  
## GET api/softskills
- returns all softskills

# POST api/results
- Example body:  
 
```
  {
   "sfia":  [{
    "hashkeyId": 1,
    "result":  "valuable",
    "sfiaSkillId": 2
   }],
     "soft":  [{
    "hashkeyId": 1,
    "result":  "valuable",
    "softSkillId": 3
   }]
}
```

## TODO

## GET api/responsibilities



# v16.18.0 (Current) nvm use 16.18.0

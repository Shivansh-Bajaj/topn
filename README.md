# topn  
application to scrape any website and get top N (here N is input) high frequent words from site.
Also has functionality to neglect stop words from results.

## Plugin Used:

####Frontend:
JQuery    
angularJS  
ngTagInput  

####Backend:

NodeJS  
expressJS  
Logger: morgan  
View engine: ejs  

####linting Tool:

jshint  

## dependencies:  

nodeJS  
NPM

## steps to build:  

application is preconfigured you just need to install dependencies. And then  

    npm start

## API's:  
URL: /api/v1/topn  

API to get top N elements from URL:

Request:  
```
  {
    METHOD: 'POST',
    HEADER: {content-type: application/json}
    data: {
      URL: <String> url to scrape data from
      n: <Number> N for resultant
      stopwords: <Array<String>> words to be neglected
    }
  }
```
Response:  
```
  {
    status: 200(success)/500(fail)
    data: {
      status: <String(success/fail)>,
      data: <Object> of type: {<Number>frequency: [<String>, <String>] words }
    }
  }
```
DEMO RESPONSE:  
Failed case:  
``` 
{
"status":"fail",
"data":{"code":"ENOTFOUND","errno":"ENOTFOUND","syscall":"getaddrinfo","hostname":"terriblytinytales.com","host":"terriblytinytales.com","port":80}
} 
```

Success case example: 
```
{
"status": "success",
"data": {9: ["ttt", "yes"], 5: ["this", "hello"]}
}
```

## DEMO USAGE FRONTEND APP  

![Alt Text](./DEMO/demo1.gif)

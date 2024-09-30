const http = require('http');
const { v4: uuidv4 } = require('uuid');

const port = 8080;  // define a port
const server = http.createServer((request,response)=>{   // creating a server
    if(request.method==='GET'){   // if only request method is get
    let arr = request.url.split('/');
    let url = arr[arr.length-1];
    if(!arr.includes('delay')){   // if url did not contain delay
    switch(url){
        case 'html':                                         // using switch we can switch based on url provided
            response.writeHead(200,{'content-Type':'text/html'});
            response.write(
                '<!DOCTYPE html>'+
               '<html>' +
          '<head></head>' +
          '<body>' +
          '<h1>Any fool can write code that a computer can understand. Good programmers write code that humans can understand.</h1>' +
          '<p>- Martin Fowler</p>' +
          '</body>' +
          '</html>');
            response.end();
            break;
        case 'json':
            response.writeHead(200,{'content-Type':'application/json'});
            response.write(
               JSON.stringify({
                "slideshow": {
                  "author": "Yours Truly",
                  "date": "date of publication",
                  "slides": [
                    {
                      "title": "Wake up to WonderWidgets!",
                      "type": "all"
                    },
                    {
                      "items": [
                        "Why <em>WonderWidgets</em> are great",
                        "Who <em>buys</em> WonderWidgets"
                      ],
                      "title": "Overview",
                      "type": "all"
                    }
                  ],
                  "title": "Sample Slide Show"
                }
              },null,2));
            response.end();
            break;
        case 'uuid':
            response.writeHead(200,{'content-Type':'application/json'});
            response.write(JSON.stringify({
                UUID:uuidv4(),
            }));
            response.end();
            break;
         case '100':                           // we did not get any response beacause 100 means continuely checking for to get information
            response.statusCode=100;
            response.setHeader('Content-Type','text/plain');
            response.write('Getting information');
            response.write(`\n Status Code ${response.statusCode}`);
            response.end();
            break;
        case '200':                          // setting the status code 
            response.statusCode = 200; 
            response.setHeader('Content-Type', 'text/plain'); 
            response.write('requestuest in process');
            response.write(`\nStatus Code: ${response.statusCode}`);
            response.end(); 
            break;
            
        case '500':
            response.statusCode = 500;
            response.setHeader('Content-Type','text/plain');
            response.write('Interal server error');
            response.write(`\n Status Code: ${response.statusCode}`);
            response.end();
            break;
        case '404':
            response.statusCode=404;
            response.setHeader('Content-Type','text/plain');
            response.write('Not Found');
            response.write(`\n Status Code: ${response.statusCode}`);
            response.end();
            break;
        case '300':
            response.statusCode=300;
            response.setHeader('Content-Type','text/plain');
            response.write('Redirect Page');
            response.write(`\n Status Code ${response.statusCode}`);
            response.end();
            break;
        default:
            response.statusCode = 400;
            response.setHeader('Content-Type', 'text/plain');
            response.write('Invalid requestuest');
            response.end();
             break;
    }
}else{

    let delay = parseInt(url,10);  // converting string to integer
    if(isNaN(delay)){
        response.statusCode = 400;      // if it not a number then send a error
        response.setHeader('Content-Type', 'text/plain');
        response.write('Invalid requestuest');
        response.end();
    }
    else{
    response.writeHead(200,{'Content-Type':'text/plain'});  // getting the output after delay period end
    setTimeout(()=>{
        response.write(`message viewd at ${url}`);
        response.write(`\n responseponse Stauts:${response.statusCode}`);
        response.end();
    },delay);
}  
}
}
});

server.listen(port,()=>{            // listen the server on the port
    console.log(`port at ${port}`);
})
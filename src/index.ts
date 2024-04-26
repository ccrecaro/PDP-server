import  {Policy} from "../../json-access-control";
import  {RequestCtx} from "../../json-access-control";
import  {JsonSerializer} from "../../json-access-control";
import  {PDP} from "../../json-access-control";
import  {PolicyFinder} from "../../json-access-control";
import  {parseRequestToJSON} from "../../json-access-control";
import  {loadRequest} from "../../json-access-control";
//import  {Result} from "../../json-access-control";
import  {ResponseCtx} from "../../json-access-control";

import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    const defaultSerializer = new JsonSerializer();

    const reqJSON = parseRequestToJSON("bs@simpsons.com");
    const reqFile:RequestCtx = loadRequest("/Users/carolinacontreras/Desktop/TFM/PAP/policies/json/testRequestRole.json");

    const requestFromJSON: RequestCtx = defaultSerializer.deserialize(reqJSON, RequestCtx) as RequestCtx; //cast para anular nulls            
    console.log("===== Objeto 3======");
    var policyFinder: PolicyFinder = new PolicyFinder(["/Users/carolinacontreras/Desktop/TFM/PAP/policies/json/testPolicyRole.json"]);
    var pdp:PDP = new PDP(policyFinder);
    pdp.policyFinder.loadPolicies();
    
    var resCtx = pdp.evaluateContext(reqFile);
    console.log(JSON.stringify(resCtx));
});

app.post('/api/login', (req, res) => {
  
  checkAccess(req, res);
});

app.post('/api/permission', (req, res) => {
  checkAccessWithRequestCtx(req, res);
});


app.listen(3001, () => {
  console.log('Server is running on port 3001');
})


function checkAccess(req: Request, res: Response){
  const { username, password } = req.body;
  const defaultSerializer = new JsonSerializer();

  //"bs@simpsons.com")
  const reqJSON = parseRequestToJSON(username);

  const requestFromJSON: RequestCtx = defaultSerializer.deserialize(reqJSON, RequestCtx) as RequestCtx; //cast para anular nulls            
  console.log("===== Objeto 3======");
  var policyFinder: PolicyFinder = new PolicyFinder(["/Users/carolinacontreras/Desktop/TFM/PAP/policies/json/testPolicyRole.json"]);
  var pdp:PDP = new PDP(policyFinder);
  pdp.policyFinder.loadPolicies();
  
  var resCtx = pdp.evaluateContext(requestFromJSON);
  console.log(JSON.stringify(resCtx));

  return resCtx.result[0].decision === "Permit" ? res.json({ message: "Access granted" }) : res.status(403).json({ message: "Access denied" });
}

function checkAccessWithRequestCtx(req: Request, res: Response){
  const { requestCtxJSON } = req.body;
  const defaultSerializer = new JsonSerializer();

  const requestFromJSON: RequestCtx = defaultSerializer.deserialize(requestCtxJSON, RequestCtx) as RequestCtx; //cast para anular nulls 

  console.log("===== Objeto 3======");
  var policyFinder: PolicyFinder = new PolicyFinder(["/Users/carolinacontreras/Desktop/TFM/PAP/policies/json/testPolicyRole.json"]);
  var pdp:PDP = new PDP(policyFinder);
  pdp.policyFinder.loadPolicies();
  
  var resCtx = pdp.evaluateContext(requestFromJSON);

  return resCtx.result[0].decision === "Permit" ? res.json({ message: "Access granted" }) : res.status(403).json({ message: "Access denied" });
}
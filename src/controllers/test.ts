/*
import { Policy } from "./components/Policy";
import { RequestCtx } from "./components/objects/architecture/context/RequestCtx";
import { dataPolicy } from "./resources/policies/ts/testPolicy";
import { JsonSerializer } from 'typescript-json-serializer';
import { dataRequest } from "./resources/policies/ts/testRequestWithComillas";
import { PDP } from "./components/objects/architecture/PDP";
import { PolicyFinder } from "./components/objects/finder/PolicyFinder";
import { parseRequestToJSON } from "./utils/Functions/parseRequestToJSON";
import { loadRequest } from "./utils/Functions/loadRequest";

//const dataRequest = parseRequestToJSON();

const defaultSerializer = new JsonSerializer();

const policyTest:Policy = defaultSerializer.deserialize(dataPolicy, Policy) as Policy;
const requestTest:RequestCtx = defaultSerializer.deserialize(dataRequest, RequestCtx) as RequestCtx;

const reqJSON = parseRequestToJSON("bs@simpsons.com");
const req:RequestCtx = loadRequest("./src/resources/policies/json/testRequest2.json");

console.log("===== Objeto 3======");
var policyFinder: PolicyFinder = new PolicyFinder(["./src/resources/policies/json/testPolicy4.json"]);
var pdp:PDP = new PDP(policyFinder);
pdp.policyFinder.loadPolicies();

var res = pdp.evaluateContext(req);
console.log(JSON.stringify(res));


var res2 = policyTest.evaluate(requestTest);
//console.log(res2);
/*
console.log("====== JSON =====");
const data = defaultSerializer.serialize(res);
console.log(JSON.stringify(data));
*/



const match_key = function(att1, att2){
    const att1Array = att1.split(',');
    const att2Array = att2.split(',');
    for(let att1s of att1Array){
        for(let att2s of att2Array){
            if(att1s === att2s){
                return [att1s,att2s];
            }
        }
    }        
}

let att1 = '가, 나, 다, 라';s
let att2 = '마, 바, 아, 나';
console.log(match_key(att1, att2));


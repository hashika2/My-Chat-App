export function afterPostMessage(postMessagedata){
    return({
        action:"AFTER_POST_MESSAGE",
        payload:postMessagedata.da
    })
}
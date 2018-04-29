var characters = {
    obiwan:{
        hp:100,
        attack:6,
        counterattack:30,
        id:1
    },
    macewindu:{
        hp:80,
        attack:8,
        counterattack:25,
        id:2
    },
    general:{
        hp:120,
        attack:5,
        counterattack:37,
        id:3
    },
    vader:{
        hp:150,
        attack:12,
        counterattack:20,
        id:4
    }

};

console.log(Object.keys(characters)[0])
console.log(Object.keys(characters)[1])

//Character Selection
$(".characterSelection").on("click", ".imagebox", function(){
    var htmlid = $(this).attr("id");
    console.log(htmlid);
    var characterobj = GetJSONString(htmlid);
    $(this).attr("data-obj", characterobj)
    $(this).clone().addClass("selected").appendTo($(".yourcharacter"));
    
    $(this).remove();
    MoveEnemies();

});

//Clone all remaining Characters and move them to enemies div
function MoveEnemies(selected){
    $(".characterSelection").children().clone().addClass("badguy").appendTo($(".enemies"));
    $(".characterSelection").children().remove();
}

//On click to Select Enemy to Attack
$(".enemies").on("click", ".imagebox", function(){
    var htmlid = $(this).attr("id");
    $(this).clone().addClass("defence").appendTo($(".defender"));
    var characterobj = GetJSONString(htmlid);
    $(this).attr("data-obj", characterobj)
    $(this).remove();
});

//Attack button to trigger calls to math for hp and attack
$(".fightsection").on("click","#attack-btn",function(){
    //Get attacjer obj stored in element
    var dataobj = $(".selected").attr("data-obj");
    var attackerObj = JSON.parse(dataobj);
    //Get defender Obj store in element
    var dataobj2 = $(".defence").attr("data-obj");
    var defenderObj = JSON.parse(dataobj);
    //Calculate defendr hp - attacker attack
    //attacker attack increases by attack power
    //Calculate attacker hp -  defender counter attack 
    //Display new hps
    

});

function GetJSONString(htmlid){

    for(var i= 0; i < Object.keys(characters).length; i++)
    {
        var key = (Object.keys(characters)[i]);
        idkey = characters[key].id;
       //console.log("ck= " + JSON.stringify(characters[key]));      
        if(idkey == htmlid)
        {
            var jsonstring = JSON.stringify(characters[key]);
            return jsonstring;
        }
    }
    
}


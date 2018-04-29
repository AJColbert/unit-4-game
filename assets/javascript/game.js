var characters = {
    obiwan: {
        hp: 100,
        attack: 16,
        baseattack: 16,
        counterattack: 10,
        name: "Obi-Wan Kenobi",
        id: 1
    },
    macewindu: {
        hp: 80,
        attack: 8,
        baseattack: 8,
        counterattack: 8,
        name: "Mace Windu",
        id: 2
    },
    general: {
        hp: 120,
        attack: 7,
        baseattack: 7,
        counterattack: 18,
        name: "General Grievous",
        id: 3
    },
    vader: {
        hp: 150,
        attack: 12,
        baseattack: 12,
        counterattack: 20,
        name: "Darth Vader",
        id: 4
    }

};

console.log(Object.keys(characters)[0])
console.log(Object.keys(characters)[1])
currentattack = 0;


//Character Selection
$(".characterSelection").on("click", ".imagebox", function ()
{
    var htmlid = $(this).attr("id");
    console.log(htmlid);
    var characterobj = GetJSONString(htmlid);
    $(this).attr("data-obj", characterobj)
    $(this).clone().addClass("selected").appendTo($(".yourcharacter"));

    $(this).remove();
    MoveEnemies();

});

//Clone all remaining Characters and move them to enemies div
function MoveEnemies(selected)
{
    $(".characterSelection").children().clone().addClass("badguy").appendTo($(".enemies"));
    $(".characterSelection").children().remove();
}

//On click to Select Enemy to Attack
$(".enemies").on("click", ".imagebox", function ()
{
    //console.log($(".defender").children())
    if ($(".defender").children().length <= 0)
    {
        var htmlid = $(this).attr("id");
        var characterobj = GetJSONString(htmlid);
        $(this).attr("data-obj", characterobj)
        $(this).clone().addClass("defence").appendTo($(".defender"));
        $(this).remove();
        $("#pAttacker").text("")
    }
});

//Attack button to trigger calls to math for hp and attack
$(".fightsection").on("click", "#attack-btn", function ()
{
    if ($(".defender").children().length > 0)
    {
        //Get attacjer obj stored in element
        var dataobj = $(".selected").attr("data-obj");
        var attackerObj = JSON.parse(dataobj);
        //Get defender Obj store in element
        var dataobj2 = $(".defence").attr("data-obj");
        var defenderObj = JSON.parse(dataobj2);
        console.log(attackerObj.attack)

        //Calculate defendr hp - attacker attack
        console.log(defenderObj.hp - attackerObj.attack);
        console.log("attack = " + attackerObj.attack)
        console.log("defender hp = " + defenderObj.hp)
        defenderObj.hp -= attackerObj.attack;
        console.log("defender new hp = " + defenderObj.hp)
        
        //Calculate attacker hp -  defender counter attack 
        attackerObj.hp -= defenderObj.counterattack;

        ScreenUpdate(attackerObj, defenderObj);

         //attacker attack increases by attack power
        attackerObj.attack += attackerObj.baseattack;
        console.log(attackerObj.attack)

        var jsonstring = JSON.stringify(attackerObj);
        $(".selected").attr("data-obj", jsonstring)
        console.log(jsonstring)
        jsonstring = JSON.stringify(defenderObj);
        $(".defence").attr("data-obj", jsonstring)
        console.log(jsonstring)

    }
    else
    {
        $("#pAttacker").text("No enemy here.")
        $("#pDefender").text("");
    }

});

function GetJSONString(htmlid)
{
    for (var i = 0; i < Object.keys(characters).length; i++)
    {
        var key = (Object.keys(characters)[i]);
        idkey = characters[key].id;

        if (idkey == htmlid)
        {
            var jsonstring = JSON.stringify(characters[key]);
            return jsonstring;
        }
    }
}


function ScreenUpdate(attackerObj, defenderObj)
{
    if (attackerObj.hp > 0 && defenderObj.hp > 0)
    {
        //Display message below Deender
        $("#pAttacker").text("You attacked " + defenderObj.name + " for " + attackerObj.attack + " damage");
        $("#pDefender").text(defenderObj.name + "Attacked you back for " + defenderObj.counterattack + " damage");

        //Update HP
        $(".selected #hp").text(attackerObj.hp)
        $(".defence #hp").text(defenderObj.hp)
    }
    else if (attackerObj.hp <= 0 && defenderObj.hp > 0)
    {
        $(".selected #hp").text(attackerObj.hp)
        $(".defence #hp").text(defenderObj.hp)
        $("#pAttacker").text("You've Been Defeated....GAME OVER")
        $("#pDefender").text("");
        //Create or show button to restart
    }
    else if (attackerObj.hp > 0 && defenderObj.hp <= 0)
    {
        console.log("I GOT IN TO REMOVE")
        $(".defence").remove();

        if ($(".enemies").children().length >= 0)
        {
            $("#pDefender").empty();
            $("#pAttacker").text("You have defeated" + defenderObj.name + ", You can choose to fight another enemie");

        }
        else
        {
            $("#pAttacker").text("YOU WON!!!!GAME OVER!!!")
            $("#pDefender").text("");
            //Create or show button to restart

        }



    }


}

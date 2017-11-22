var ProjectName = 'Neuroevolution_doodle-jump';

var Neuvol = new Neuroevolution({
    population:10,
    network:[8, [7], 3],
    mutationRate: 0.5,
    nbChild:2,
    // randomBehaviour: 0.8
});

G = Neuvol.nextGeneration();

var G_deaded = [];

iframeList = [];

function eachIframe(_do){
    for(var i = 0; i < iframeList.length; i++){
        _do(iframeList[i].contentWindow, i);
    }
}

function startGame(_win)
{
    _win.init();
}


function reStartGame(_win)
{
    _win.reset();
}

function movePlayer(_win, _direction)
{
    if(_direction){
        _win.document.onkeydown({keyCode: 37});
        // _win.document.onkeyup({keyCode: 37});
        return;
    }
    _win.document.onkeydown({keyCode: 39});
    // _win.document.onkeyup({keyCode: 39});
}

function startAllIframe()
{
    eachIframe(function (_win)
    {
        startGame(_win);
    });
    setZeroTimeout(function ()
    {
        eachIframe(function (_win, _index)
        {
            movePlayer(_win, 0);
            // if(!_index){
            //     console.log(_win.platforms);
            // }
        });

        setZeroTimeout(arguments.callee);
    });
}

setTimeout(
    function ()
    {
        var body = document.getElementsByTagName('body')[0];
        for(var i = 0; i < G.length; i++){
            var ifff = document.createElement('iframe');
            ifff.src="game.html";
            ifff.setAttribute("frameborder", "0");
            iframeList.push(ifff);
            body.appendChild(ifff);
        }

        setTimeout(startAllIframe, 3000);
    }
);
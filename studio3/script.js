(function(){
    "use strict";
    console.log("reading js");

    

    

    document.getElementById('start').addEventListener('click', function() {
        document.getElementById('overlay').classList.remove('hidden');
    });
    
    document.getElementById('x').addEventListener('click', function() {
        document.getElementById('overlay').classList.add('hidden');
    });

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            document.getElementById('overlay').className='hidden';
        }
    });
    
})();
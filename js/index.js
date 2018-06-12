//IIFE Construct 
(function (){ 
    buttonPopulate();
    onButtonClick(document.getElementById("createNoteButton"))
    var noteIndex = 0;

      var html = "<div class=\"modal-container\">\n" +
      "    <section class=\"create-modal\">\n" +
      "        <div class=\"form-group title\">\n" +
      "            <label class=\"sr-only\">Title</label>\n" +
      "            <input type=\"text\" id =\"title\" placeholder=\"Title...\" class=\"form-control\">\n" +
      "        </div>\n" +
      "        <div class=\"form-group\">\n" +
      "            <label class=\"sr-only\">Content</label>\n" +
      "            <textarea type=\"text\" id=\"content\" placeholder=\"Content...\" class=\"form-control\"></textarea>\n" +
      "        </div>\n" +
      "        <div class=\"form-group action-btn\">\n" +
      "            <button class=\"btn btn-primary \" id='cancel-button'>Cancel</button>\n" +
      "            <button class=\"btn btn-primary\" id='save-button'>Save</button>\n" +
      "        </div>\n" +
      "    </section>\n" +
      "</div>"; 

    function buttonPopulate(){
        //Add sticky-notes button creation
        var button = document.createElement("button");
        button.innerHTML = "Add Sticky Note";
        button.id = "createNoteButton"
        
        var buttonDiv = document.getElementById("createNoteButton");
        buttonDiv.append(button)
        localStorage.noteIndex = localStorage.noteIndex ? localStorage.noteIndex : 0
    }
        
    function onButtonClick(button){
        button.addEventListener ("click", function() {
            var noteIndex = localStorage.noteIndex 
            var node = document.createElement("li");
        
            var nodeAnchor = document.createElement("a");
            nodeAnchor.href = "#";
            nodeAnchor.innerText = "+ Create a note";
            nodeAnchor.id = "box"+noteIndex;
            node.append(nodeAnchor);
        
            var nodeSpan = document.createElement("span");
            nodeSpan.className = "close";
            nodeSpan.innerText = "X";
            nodeAnchor.append(nodeSpan);
        
            var nodeH2 = document.createElement("h2");
            nodeAnchor.appendChild(nodeH2);
        
            var nodeP1 = document.createElement("p");
            nodeAnchor.appendChild(nodeP1);
        
            var nodeP2 = document.createElement("p");
            nodeAnchor.appendChild(nodeP2);
        
            document.getElementById("mainList").append(node);
            document.getElementById("box"+noteIndex).addEventListener('click',onCreateNoteClick);
                
            nodeSpan.addEventListener("click",del);
            localStorage.noteIndex = (Number(localStorage.noteIndex)+1);
              }); 
        }
            
      
    //Working Code to create
    function onCreateNoteClick(event){
        var tempId = event.target.id;

        //Default on-click on note event
        document.getElementById('modal-container').innerHTML = html;
        //Cancel button on click event inside modal
        document.getElementById('cancel-button').addEventListener('click',function(event){
            document.getElementById('modal-container').innerHTML = "";
        });

        //Create content in sticky note on click of save button
        
        document.getElementById('save-button').addEventListener('click',function(){ //debugger;
            document.querySelector("a[id="+tempId+"]").firstChild.nodeValue = " ";

            //Main object creation which holds title and content
            event.preventDefault()
            var objectNote = {
                tNote: document.querySelector("a[id="+tempId+"]> h2").innerHTML = document.getElementById('title').value ,
                cNote: document.querySelector("a[id="+tempId+"]> p").innerHTML = document.getElementById('content').value
            };

            var variables = [objectNote.tNote , objectNote.cNote]
            var varString = JSON.stringify(variables)

            window.localStorage.setItem("Notes", varString)
            var noteContent = JSON.parse(localStorage.getItem("Notes"))
        
            document.getElementById('modal-container').innerHTML = "";
        });
    }

    //Delete a sticky note
    var delObj = document.getElementsByClassName('close');
    for(var i=0;i<delObj.length;i++){
        delObj[i].addEventListener('click',del);
    }
    
    function del(event){
        event.stopPropagation();
        var ulList = document.getElementById('mainList');
        ulList.removeChild(event.target.parentElement.parentElement);
    }

})();


document.getElementById("submitButton").addEventListener("click", function() {
    var selectDifficult = document.getElementById("selectDifficult").value;
    var infinityCheckbox = document.querySelector("input[name='subscribe']:checked");

    var data = {
        "selectDifficult": selectDifficult,
        "infinityCheckbox": infinityCheckbox ? "Yes" : "No"
    };

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/startGame", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            window.location.href = "/game";
        }
    };
    xhr.send(JSON.stringify(data));
});
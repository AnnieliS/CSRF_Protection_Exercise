const DelayRedirect = () => {
    let seconds = 5;
    const dvCountDown = document.getElementById("dvCountDown");
    const lblCount = document.getElementById("lblCount");
    dvCountDown.style.display = "block";
    lblCount.innerHTML = seconds;
    setInterval(() => {
        seconds--;
        lblCount.innerHTML = seconds;
        if (seconds == 0) {
            dvCountDown.style.display = "none";
            window.location.href = "http://localhost:5069/";
        }
    }, 1000);
}

window.onload = DelayRedirect();
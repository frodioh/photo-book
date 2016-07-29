window.onload = function() {
  if(document.querySelector("#registerSignInLink")) {
    //Переворот
    var login = document.querySelector("#registerSignInLink"),
        register = document.querySelector("#loginSignUpLink");
        flipper = document.querySelector(".flipper");
        headerLogin = document.querySelector(".headers__login"),
        headerRegister = document.querySelector(".headers__register");
    login.addEventListener('click', function(e) {
      e.preventDefault();
      flipper.classList.toggle("active");
      flipper.style.height = "200px";
      headerLogin.classList.add("active");
      headerRegister.classList.remove("active");
    });
    register.addEventListener('click', function(e) {
      e.preventDefault();
      flipper.classList.toggle("active");
      flipper.style.height = "280px";
      headerRegister.classList.add("active");
      headerLogin.classList.remove("active");
    });
    //Регистрация
    (function() {
      var registerBtn = document.querySelector(".register-create-btn"),
          registerName = document.querySelector("#registerName"),
          registerEmail = document.querySelector("#registerEmail"),
          registerPass = document.querySelector("#registerPass");
      //Сам fetch
      registerBtn.addEventListener('click', function() {
        var registerInfo = {
          "name": registerName.value,
          "email": registerEmail.value,
          "password": registerPass.value
        };
        //Настройки для fetch
        myHeaders = new Headers({
          "Content-Type": "application/json"
        });
        var myInit = { 
          method: 'POST',
          headers: myHeaders,
          mode: 'cors',
          cache: 'default',
          redirect: 'follow',
          body: JSON.stringify(registerInfo)
        };
        fetch('/register', myInit).then(function(res) {
        });
      });
    }());
    //Авторизация
    (function() {
      var loginBtn = document.querySelector(".login-form__login-btn"),
          loginEmail = document.querySelector("#loginEmail"),
          loginPass = document.querySelector("#loginPass");
      //Сам fetch
      loginBtn.addEventListener('click', function() {
        var authInfo = {
          "email": loginEmail.value,
          "password": loginPass.value
        };
        //Настройки для fetch
        myHeaders = new Headers({
          "Content-Type": "application/json"
        });
        var myInit = { 
          method: 'POST',
          headers: myHeaders,
          mode: 'cors',
          cache: 'default',
          redirect: 'follow',
          body: JSON.stringify(authInfo)
        };
        fetch('/auth', myInit).then(function(res) {
        });
      });
    }());
  }
  if(document.querySelector("#userEditBtn")) {
    var userEditBtn = document.querySelector("#userEditBtn");
    var userOffBtn = document.querySelector("#userOffBtn");
    var editHeader = document.querySelector(".edit-header");
    var userHeader = document.querySelector(".user-header");
    var userSearch = document.querySelector(".user-search");
    var editHeaderCancel = document.querySelector("#editHeaderBtnCancel");
    var editHeaderSave = document.querySelector("#editHeaderBtnSave");
    userEditBtn.addEventListener("click", function() {
      editHeader.classList.toggle("active");
      userHeader.style.opacity = 0;
      userSearch.style.opacity = 0;
    });
    editHeaderCancel.addEventListener("click", function() {
      editHeader.classList.toggle("active");
      userHeader.style.opacity = 1;
      userSearch.style.opacity = 1;
    });
    //Социальные ссылки
    var social = $(".edit-header .user-card__social-icon");
    var socialSave = $(".social-btn--save");
    var socialCancel = $(".social-btn--cansel");
    social.on("click", function(e) {
      social.removeClass("active");
      e.currentTarget.classList.add("active");
    });
    socialSave.on("click", function(e) {
      e.stopPropagation();
      var current = $(e.currentTarget.parentElement.parentElement);
      current.removeClass("active");
    });
    socialCancel.on("click", function(e) {
      e.stopPropagation();
      var current = $(e.currentTarget.parentElement.parentElement);
      var input = current.find(".user-card__social-text");
      current.removeClass("active");
      input.value = "";
    });
  }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIndpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbigpIHtcclxuICBpZihkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3JlZ2lzdGVyU2lnbkluTGlua1wiKSkge1xyXG4gICAgLy/Qn9C10YDQtdCy0L7RgNC+0YJcclxuICAgIHZhciBsb2dpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcmVnaXN0ZXJTaWduSW5MaW5rXCIpLFxyXG4gICAgICAgIHJlZ2lzdGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNsb2dpblNpZ25VcExpbmtcIik7XHJcbiAgICAgICAgZmxpcHBlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZmxpcHBlclwiKTtcclxuICAgICAgICBoZWFkZXJMb2dpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaGVhZGVyc19fbG9naW5cIiksXHJcbiAgICAgICAgaGVhZGVyUmVnaXN0ZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmhlYWRlcnNfX3JlZ2lzdGVyXCIpO1xyXG4gICAgbG9naW4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgZmxpcHBlci5jbGFzc0xpc3QudG9nZ2xlKFwiYWN0aXZlXCIpO1xyXG4gICAgICBmbGlwcGVyLnN0eWxlLmhlaWdodCA9IFwiMjAwcHhcIjtcclxuICAgICAgaGVhZGVyTG9naW4uY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgICAgaGVhZGVyUmVnaXN0ZXIuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgIH0pO1xyXG4gICAgcmVnaXN0ZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgZmxpcHBlci5jbGFzc0xpc3QudG9nZ2xlKFwiYWN0aXZlXCIpO1xyXG4gICAgICBmbGlwcGVyLnN0eWxlLmhlaWdodCA9IFwiMjgwcHhcIjtcclxuICAgICAgaGVhZGVyUmVnaXN0ZXIuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgICAgaGVhZGVyTG9naW4uY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgIH0pO1xyXG4gICAgLy/QoNC10LPQuNGB0YLRgNCw0YbQuNGPXHJcbiAgICAoZnVuY3Rpb24oKSB7XHJcbiAgICAgIHZhciByZWdpc3RlckJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucmVnaXN0ZXItY3JlYXRlLWJ0blwiKSxcclxuICAgICAgICAgIHJlZ2lzdGVyTmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcmVnaXN0ZXJOYW1lXCIpLFxyXG4gICAgICAgICAgcmVnaXN0ZXJFbWFpbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcmVnaXN0ZXJFbWFpbFwiKSxcclxuICAgICAgICAgIHJlZ2lzdGVyUGFzcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcmVnaXN0ZXJQYXNzXCIpO1xyXG4gICAgICAvL9Ch0LDQvCBmZXRjaFxyXG4gICAgICByZWdpc3RlckJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciByZWdpc3RlckluZm8gPSB7XHJcbiAgICAgICAgICBcIm5hbWVcIjogcmVnaXN0ZXJOYW1lLnZhbHVlLFxyXG4gICAgICAgICAgXCJlbWFpbFwiOiByZWdpc3RlckVtYWlsLnZhbHVlLFxyXG4gICAgICAgICAgXCJwYXNzd29yZFwiOiByZWdpc3RlclBhc3MudmFsdWVcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8v0J3QsNGB0YLRgNC+0LnQutC4INC00LvRjyBmZXRjaFxyXG4gICAgICAgIG15SGVhZGVycyA9IG5ldyBIZWFkZXJzKHtcclxuICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdmFyIG15SW5pdCA9IHsgXHJcbiAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgIGhlYWRlcnM6IG15SGVhZGVycyxcclxuICAgICAgICAgIG1vZGU6ICdjb3JzJyxcclxuICAgICAgICAgIGNhY2hlOiAnZGVmYXVsdCcsXHJcbiAgICAgICAgICByZWRpcmVjdDogJ2ZvbGxvdycsXHJcbiAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShyZWdpc3RlckluZm8pXHJcbiAgICAgICAgfTtcclxuICAgICAgICBmZXRjaCgnL3JlZ2lzdGVyJywgbXlJbml0KS50aGVuKGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuICAgIH0oKSk7XHJcbiAgICAvL9CQ0LLRgtC+0YDQuNC30LDRhtC40Y9cclxuICAgIChmdW5jdGlvbigpIHtcclxuICAgICAgdmFyIGxvZ2luQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5sb2dpbi1mb3JtX19sb2dpbi1idG5cIiksXHJcbiAgICAgICAgICBsb2dpbkVtYWlsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNsb2dpbkVtYWlsXCIpLFxyXG4gICAgICAgICAgbG9naW5QYXNzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNsb2dpblBhc3NcIik7XHJcbiAgICAgIC8v0KHQsNC8IGZldGNoXHJcbiAgICAgIGxvZ2luQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIGF1dGhJbmZvID0ge1xyXG4gICAgICAgICAgXCJlbWFpbFwiOiBsb2dpbkVtYWlsLnZhbHVlLFxyXG4gICAgICAgICAgXCJwYXNzd29yZFwiOiBsb2dpblBhc3MudmFsdWVcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8v0J3QsNGB0YLRgNC+0LnQutC4INC00LvRjyBmZXRjaFxyXG4gICAgICAgIG15SGVhZGVycyA9IG5ldyBIZWFkZXJzKHtcclxuICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdmFyIG15SW5pdCA9IHsgXHJcbiAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgIGhlYWRlcnM6IG15SGVhZGVycyxcclxuICAgICAgICAgIG1vZGU6ICdjb3JzJyxcclxuICAgICAgICAgIGNhY2hlOiAnZGVmYXVsdCcsXHJcbiAgICAgICAgICByZWRpcmVjdDogJ2ZvbGxvdycsXHJcbiAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShhdXRoSW5mbylcclxuICAgICAgICB9O1xyXG4gICAgICAgIGZldGNoKCcvYXV0aCcsIG15SW5pdCkudGhlbihmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcbiAgICB9KCkpO1xyXG4gIH1cclxuICBpZihkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3VzZXJFZGl0QnRuXCIpKSB7XHJcbiAgICB2YXIgdXNlckVkaXRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3VzZXJFZGl0QnRuXCIpO1xyXG4gICAgdmFyIHVzZXJPZmZCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3VzZXJPZmZCdG5cIik7XHJcbiAgICB2YXIgZWRpdEhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZWRpdC1oZWFkZXJcIik7XHJcbiAgICB2YXIgdXNlckhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudXNlci1oZWFkZXJcIik7XHJcbiAgICB2YXIgdXNlclNlYXJjaCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudXNlci1zZWFyY2hcIik7XHJcbiAgICB2YXIgZWRpdEhlYWRlckNhbmNlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZWRpdEhlYWRlckJ0bkNhbmNlbFwiKTtcclxuICAgIHZhciBlZGl0SGVhZGVyU2F2ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZWRpdEhlYWRlckJ0blNhdmVcIik7XHJcbiAgICB1c2VyRWRpdEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oKSB7XHJcbiAgICAgIGVkaXRIZWFkZXIuY2xhc3NMaXN0LnRvZ2dsZShcImFjdGl2ZVwiKTtcclxuICAgICAgdXNlckhlYWRlci5zdHlsZS5vcGFjaXR5ID0gMDtcclxuICAgICAgdXNlclNlYXJjaC5zdHlsZS5vcGFjaXR5ID0gMDtcclxuICAgIH0pO1xyXG4gICAgZWRpdEhlYWRlckNhbmNlbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oKSB7XHJcbiAgICAgIGVkaXRIZWFkZXIuY2xhc3NMaXN0LnRvZ2dsZShcImFjdGl2ZVwiKTtcclxuICAgICAgdXNlckhlYWRlci5zdHlsZS5vcGFjaXR5ID0gMTtcclxuICAgICAgdXNlclNlYXJjaC5zdHlsZS5vcGFjaXR5ID0gMTtcclxuICAgIH0pO1xyXG4gICAgLy/QodC+0YbQuNCw0LvRjNC90YvQtSDRgdGB0YvQu9C60LhcclxuICAgIHZhciBzb2NpYWwgPSAkKFwiLmVkaXQtaGVhZGVyIC51c2VyLWNhcmRfX3NvY2lhbC1pY29uXCIpO1xyXG4gICAgdmFyIHNvY2lhbFNhdmUgPSAkKFwiLnNvY2lhbC1idG4tLXNhdmVcIik7XHJcbiAgICB2YXIgc29jaWFsQ2FuY2VsID0gJChcIi5zb2NpYWwtYnRuLS1jYW5zZWxcIik7XHJcbiAgICBzb2NpYWwub24oXCJjbGlja1wiLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgIHNvY2lhbC5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcclxuICAgICAgZS5jdXJyZW50VGFyZ2V0LmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgICB9KTtcclxuICAgIHNvY2lhbFNhdmUub24oXCJjbGlja1wiLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIHZhciBjdXJyZW50ID0gJChlLmN1cnJlbnRUYXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50KTtcclxuICAgICAgY3VycmVudC5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcclxuICAgIH0pO1xyXG4gICAgc29jaWFsQ2FuY2VsLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24oZSkge1xyXG4gICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICB2YXIgY3VycmVudCA9ICQoZS5jdXJyZW50VGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudCk7XHJcbiAgICAgIHZhciBpbnB1dCA9IGN1cnJlbnQuZmluZChcIi51c2VyLWNhcmRfX3NvY2lhbC10ZXh0XCIpO1xyXG4gICAgICBjdXJyZW50LnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpO1xyXG4gICAgICBpbnB1dC52YWx1ZSA9IFwiXCI7XHJcbiAgICB9KTtcclxuICB9XHJcbn07Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9

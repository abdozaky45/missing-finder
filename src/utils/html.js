export const TempConfirmationEmail =(firstName,code)=>
`<!DOCTYPE html>
    <html>
  <head>
  <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    
  <style type="css/style.css">
  * {
  padding: 0;
  margin: 0;
  box-sizing: 0;
}


.elements {
  width: 50%;
  text-align: center;
  position: absolute;
  left: 180px;
  top: 100px;

}

.elements h1 {
  font-size: 70px;
  margin-bottom: 10px;

}

.elements i {
  margin-bottom: 40px;
  font-size: 50px;
}

.elements a {
  margin-bottom: 30px;
  font-size: 30px;
  text-decoration: none;
  color: gray;
}

.func {
    width: 25%;
    height: 40px;
    /* background-color: red; */
    font-size: 23px;
    color:red;
    margin: auto;
    font-weight:600 ;
}

.elements p {
  font-size: 30px;
}
  </style>
  </head>
  <body>
    <div class="main">
      <div class="layer">
        <div class="elements">
          <h1>Welcome</h1>
          <i class="fa-brands fa-google" style="color: #d02525"></i>
          <a href="">Missing Finder </a>
          <br>
          <br>
          <p class="text1">Thank You for signing up ${firstName}</p>
          <p class="text2">Enter this code or click the button below to confirm your email.</p>
          <br/>
          <div class="func">${code}</div>
        </div>
      </div>
    </div>
    <div class="sec"></div>
    <script src="js/main.js"></script>
  </body>
</html>`;
export const tempResetPassword =(firstName,code)=>
`<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        * {
            padding: 0;
            margin: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        .home {
            background-color: #A07757;
            width: 100%;
            height: 100vh;
            position: relative;
        }
        
        
        
        .form {
            width: 40%;
            height: 580px;
            margin: auto;
            border-radius: 30px;
            background-color: rgba(255, 255, 255, 58%);
            position: relative;
            top: 25px;
        }
        
        .details {
            height: 500px;
            width: 90%;
            margin: auto;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
        }
        
        .text1 {
            position: relative;
            top: 90px;
            font-size: 35px;
            margin-bottom: 20px;
            color: #844B29;
        }
        
        .text2 p {
            position: relative;
            bottom: 20px;
            font-size: 18px;
            color: #FEFEFE;
            text-align: center;
        }
        
        .code {
            width: 250px;
            height: 100px;
            border-radius: 50px;
            display: flex;
            bottom: 50px;
            justify-content: center;
            align-items: center;
            font-size: 50px;
            color: #8F5C3E;
        }
        
        .confirm {
            width: 150px;
            margin-left: auto;
            font-size: 16px;
            color: #8F5C3E;
            transform: translate(-10px, -40px);
            cursor: pointer;
        
        }
        
        .to-user i {
            margin-left: 5px;
        }
        
        .logo {
            width: 120px;
            height: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
            transform: translate(40px, 10px);
        }
        
        .logo img {
            width: 130px;
            opacity: 100%;
            border-radius: 50px;
        }
        
        .to-user {
            width: 150px;
            height: 30px;
            transform: translate(25px, 10px);
            display: flex;
            justify-content: center;
            align-items: center;
            color: white;
        }
        @media screen and (min-width: 450px) {
            .form {
                width: 321px;
                height: 465px;
                transform: translateY(50px);
            }
        
            .text1 {
                transform: translate(-41px, -30px);
                font-size: 20px;
            }
        
            .text2 {
                transform: translate(5px, -50px);
                font-size: 14px;
                position: relative;
            }
        
            /* .text2::after{
                position: absolute;
                top: -200px;
                left: -11px;
                content: "";
                width: 10px;
                height: 350px;
                background-color: red;
            } */
        
            .code {
                position: relative;
                bottom: 110px;
                font-size: 40px;
            }
        
            .confirm {
                position: relative;
                bottom: 110px;
                right: 7px;
                font-size: 16px;
            }
        
            .logo {
                width: 100px;
                position: relative;
                right: 13px;
                /* transform: translate(100px, 105px); */
            }
        
            .logo img {
                width: 110%;
                
            }
        
            .to-user {
                font-size: 14PX;
                position: relative;
                right: 25px;
                bottom: 5px;
            }
        
            .home {
                overflow: hidden;
            }
        }
        
        @media screen and (min-width: 450px) and (max-width:700px) {
            .one {
                width: 300px;
                height: 300px;
                opacity: 0.4;
                background-image: radial-gradient(closest-side, rgba(255, 255, 255, 0.493), rgb(161, 119, 87), rgba(0, 0, 0, 0.311), rgb(161, 119, 87));
                position: absolute;
                transform: translate(4.375rem, -3.75rem);
            }
        
            .two {
                width: 300px;
                height: 300px;
                opacity: 0.4;
                background-image: radial-gradient(closest-side, rgba(255, 255, 255, 0.493), rgb(161, 119, 87), rgba(0, 0, 0, 0.311), rgb(161, 119, 87));
                position: absolute;
                transform: translate(1.25rem, 29.375rem);
            }
        }
        /* @media screen and (min-width: 1000px){
            .text1 {
                font-size: 30px;
            }
            .text2 {
                font-size: 18px;
                position: relative;
                left: 18px;
            }
            .code{
                position: relative;
                bottom: 60px;
            }
        
        } */
    </style>
</head>
<body>

    <div class="home">
        <div class="circle one"></div>
        <div class="circle two"></div>


        <div class="form">
            
            <div class="to-user">
               ${firstName}
            </div>
            <div class="details">
                <p class="text1">Reset your password </p>
                <p class="text2">use this code to confirm your new password </p>
                <div class="code">${code}</div>
            </div>
        </div>
    </div>
</body>

</html>`


























 
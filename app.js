//console.log("ello");
const chkBtn = document.querySelector("#chkBtn");
const birthdateInp = document.querySelector("#birthdate");
const contentOpDiv = document.querySelector(".content-output");
const contentGifImg = document.querySelector(".content-gif");

const daysInMonths=[31,28,31,30,31,30,31,31,30,31,30,31];


//Adding event listener to check button , once clicked checking pallindrome process will start

chkBtn.addEventListener("click",()=>{
	
	if(birthdateInp.value){
		//console.log(birthdateInp.value);
		hideOutPut();
		showGif();
		setTimeout(()=>{
			hideGif();
			checkPallindrome(birthdateInp.value);
		},3000);


	} else{
		showOutPut("please enter input");
		hideGif();
	}

})

//to show output
function showOutPut(text){
	contentOpDiv.style.display="block";
	contentOpDiv.innerText = text;
}

//to hide output
function hideOutPut(){
	contentOpDiv.style.display="none";
}

//to show image while artificial waiting time
function showGif(){
	contentGifImg.style.display="block";
}

//to hide image 
function hideGif(){
	contentGifImg.style.display="none";
}

//will take input - textbox value
function checkPallindrome(birthDate){
	//console.log(birthDate);

	//to split birthdate which we are receiving in the format YYYY-MM-DD



	let splitBirthDate = birthDate.split("-");
	//console.log(splitBirthDate);
	let inputYear = splitBirthDate[0];
	let inputMonth = splitBirthDate[1];
	let inputDate = splitBirthDate[2];	

	let pallindromeCheckFlag = checkAllCombi(inputYear,inputDate,inputMonth);

	if(pallindromeCheckFlag){
		showOutPut("wooow , your birthdate is pallindrome "+pallindromeCheckFlag);
	} else{
		let [date,MissedDays] = checkNearestandMissedDays(inputYear,inputMonth,inputDate);
		//console.log(dateAndMissedDays);
		showOutPut("Aww , not a pallindrome , you missed by " + MissedDays + " days" + " nearest date is "+date);
	}

	//showOutPut(birthDate);
}

//here all diffferent date combinations are made
function checkAllCombi(year,date,month){

	//yyyymmdd format date string
	let dateFormat1 = year+month+date;

	//ddmmyyyy format date string
	let dateFormat2 = date+month+year;

	//mmddyy format string
	let dateFormat3 = month+date+year.substr(2);

	//mddyyyy format date string
	let dateFormat4 = Number(month)+date+year;

	if(isPallindrome(dateFormat1)){
		return year+"-"+month+"-"+date;
	} else if(isPallindrome(dateFormat2)){
		return date+"-"+month+"-"+year;
	} else if(isPallindrome(dateFormat3)){
		return month+"-"+date+"-"+year.substring(2);
	} else if(isPallindrome(dateFormat4)){
		return Number(month)+"-"+date+"-"+year;
	} else {
		return null;
	}

}

//function where pallindrome is checked
function isPallindrome(checkString){
	let max = Math.floor((checkString.length)/2);
	for(let i=0;i<max;i++){
		if(checkString[i]!=checkString[checkString.length-1-i]){
			return false;
		}
	}
	return true;
}

//function to check neares pallindrome and missed by days
function checkNearestandMissedDays(year,month,date){
	//ok - console.log("entered check nearest date");
	// for forward check
	let forwardDate = Number(date);
	let forwardMonth = Number(month);
	let forwardYear = Number(year);

	//for backward check
	let backwardDate = Number(date);
	let backwardMonth = Number(month);
	let backwardYear = Number(year);



	for(let i=1;i>0;i++){
		//console.log("entered for");
		//forward date check
		forwardDate = forwardDate + 1;
		if(forwardDate > daysInMonths[forwardMonth-1]){
			forwardDate =  1 ;
			forwardMonth = forwardMonth + 1;
			if(forwardMonth>12){
				forwardMonth =  1 ;
				forwardYear = forwardYear + 1;
			}

		}

		if(forwardDate.length == 1){
			forwardDate = "0"+forwardDate;
		}

		if(forwardMonth.length==1){
			forwardMonth = "0"+forwardMonth;
		}

		let yearStr = forwardYear.toString();
		let dateStr = forwardDate.toString();
		let monthStr = forwardMonth.toString();

		let nextPallindromeCheckFlag = checkAllCombi(yearStr,dateStr,monthStr);
		//console.log("forward nextPallindromeCheckFlag"+nextPallindromeCheckFlag);
		if(nextPallindromeCheckFlag){
			//console.log("forward check successfull");
			return [nextPallindromeCheckFlag,i];
		}



		//backward date check
		if(backwardYear>2){
			backwardDate = backwardDate - 1;
			if(backwardDate<1){
				backwardMonth = backwardMonth - 1;
				if(backwardMonth<1){
					backwardMonth = 12;
					backwardYear = backwardYear - 1 ;
					if(backwardYear<1){
						console.log("in break");
						break;
					}

				}
				backwardDate = daysInMonths[backwardMonth-1]
			}
		}

		 yearStr = backwardYear.toString();
		 dateStr = backwardDate.toString();
		 monthStr = backwardMonth.toString();

		nextPallindromeCheckFlag = checkAllCombi(yearStr,dateStr,monthStr);
		//console.log("backward nextPallindromeCheckFlag"+nextPallindromeCheckFlag);
		if(nextPallindromeCheckFlag){
			//console.log("back check successfull");
			return [nextPallindromeCheckFlag , i];
		}

	}

	
	



}
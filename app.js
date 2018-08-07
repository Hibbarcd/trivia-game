(function() {

    const myQuestions = [
        {
        question: "What is the resource a person is most likely to die from not having enough of in a survival setting?",
        answers: {
            a:"Lack of food, starvation",
            b:"Lack of water, dehydration",
            c:"Lack of warmth, hypothermia"
                },
        correctAnswer:"b" 
        },
        {
        question: "When lost at sea, is it alright to drink salt water instead of fresh water?",  
        answers: {
            a:"Yes, just drink more of it to make up for the salt content",
            b:"Yes, but it must be filtered for parasites",
            c:"No, salt water is not a subsitute for fresh water"
                },
        correctAnswer:"c"         
        },
        {
        question: "Moss only grows on the North side of trees",
        answers: {
            a:"Yes, because the northern side is always more ideal growing conditions",
            b:"No, it grows on all sides, dummy",
            c:"Yes, because the northern exposure receives the most sunlight"
                },
        correctAnswer:"b"
        },
        {
        question: "The red needle of a compass always points where?",
        answers: {
            a:"South",
            b:"East",
            c:"Magnetic North",
            d:"True North",
                },
        correctAnswer: "c"
        },
        {
        question:"When lost in the woods, do you stay put, or walk to safety?",
        answers: {
            a:"Stay put, and focus on signaling for help",
            b:"Make a break for it, you got this",
            c:"Give up, it's hopeless anyhow",
            d:"Make a plan, weigh the odds, and probably stay put"
                },
        correctAnswer:"d"
        },
        {
        question: "Can obsidian can be useful despite being brittle for making stone blades?",
        answers: {
            a:"Yes, it's actually sharper than surgical steel when properly flaked",
            b:"Nope, it is way too brittle for practical uses",
            c:"Sure, because it is more durable than most other stone blade materials"
                }, 
        correctAnswer: "a"   
        }
    ];
   
    setTimeout(timeUp, 1000 * 30);
function timeUp() {
    showResults();
    setInterval()
}

    let time = 5;
    let timeId;

    function buildQuiz() {
            const output = [];
    //Stop time==================
    function stop() {
    clearInterval(timeId)
    
                    }
//Run Time==============================
    function run() {
    timeId = setInterval(decrement, 1000);    
    setInterval((showNextSlide), 5*1000)
            }
            run();

    function decrement() {
        time--;
        $("#timer").html(time);
  
        if (time == 0) {
            clearInterval(timeId);
            stop();
            showResults();
        }
                }    
//Generate Question================================================================
             myQuestions.forEach((currentQuestion, questionNumber) => 
            {
                const answers = [];
                    for(letter in currentQuestion.answers)
                    {
                        answers.push(
                            `<label>
                            <input type="radio"
                            name="question${questionNumber}"
                            value="${letter}">
                            ${letter} :
                            ${currentQuestion.answers[letter]}</label>`
                            );
                            }
            output.push(`<div class="slide"> 
            <div class="question">
            ${currentQuestion.question} </div>
            <div class="answers">
            ${answers.join('')}</div></div>`
            );
        });
    quizContainer.innerHTML = output.join("");
    }

//====End results ====================================================================
function showResults(){
    const answerContainers = quizContainer.querySelectorAll('.answers');
    let correct = 0;

    myQuestions.forEach((currentQuestion, questionNumber) => {

        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;

// conditional to get alert to respond only to current question ????
 //====================================================================== 
           
            if (userAnswer === currentQuestion.correctAnswer) {   
                    // alert("You're doing solidly OK")
                    correct++;
                    answerContainers[questionNumber].style.color = 'green';
                }
            else if (userAnswer != currentQuestion.correctAnswer) {
                    answerContainers[questionNumber].style.color = 'red';  
            }   
                });   
    
    resultsContainer.innerHTML = `${correct} correct out of  ${myQuestions.length}`;

            }

 //================================================================

  function showSlide(n) {
    if ( n < myQuestions.length){
      slides[currentSlide].classList.remove('active-slide');
      slides[n].classList.add('active-slide');
    } 
      currentSlide = n;
        if (currentSlide == 0) {
            previousButton.style.display = "none";
        } 
        else { previousButton.style.display = "inline-block"};
    }

  //=======================================================================
  function showNextSlide() {
    let time = 5;
    let timeId;

    timeId = setInterval(decrement, 1000);
    function decrement() {
        time--;
        $("#timer").html(time);
  
                if (time == 0) {
                    previousButton.style.display = "";
                clearInterval(timeId);
                showResults();
                }
            }
                    showSlide(currentSlide + 1)
        }
//=====================================================
  function showPreviousSlide() {
      showSlide(currentSlide - 1);
  }
//====================================================================
  const quizContainer = document.getElementById('quiz');
  let resultsContainer = document.getElementById('results');
  
  buildQuiz();


  const previousButton = document.getElementById('previous');

  const nextButton = document.getElementById("next");
  
  const slides = document.querySelectorAll(".slide");
  
  let currentSlide = 0;
  showSlide(0);
 
previousButton.addEventListener('click', showPreviousSlide);

}());

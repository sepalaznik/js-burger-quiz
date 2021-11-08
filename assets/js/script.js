document.addEventListener("DOMContentLoaded", function () {
    const buttonOpenModal = document.getElementById("btnOpenModal");
    const modalBlock = document.getElementById("modalBlock");
    const closeModal = document.getElementById("closeModal");
    const questionTitle = document.getElementById("question");
    const formAnswers = document.getElementById("formAnswers");
    const nextButton = document.getElementById("next");
    const previousButton = document.getElementById("prev");
    const sendButton = document.getElementById("send");
    const burgerButton = document.getElementById("burger-menu");

    const questions = [
        {
            question: "What color is the burger?",
            answers: [
                {
                    title: "Standart",
                    imageUrl: "./assets/image/burger.png"
                },
                {
                    title: "Black",
                    imageUrl: "./assets/image/burger-black.png"
                }
            ],
            type: "radio"
        },
        {
            question: "What meat is the cutlet made from?",
            answers: [
                {
                    title: "Chicken",
                    imageUrl: "./assets/image/meat-chicken.png"
                },
                {
                    title: "Beef",
                    imageUrl: "./assets/image/meat-beef.png"
                },
                {
                    title: "Pork",
                    imageUrl: "./assets/image/meat-pork.png"
                }
            ],
            type: "radio"
        },
        {
            question: "Additional ingredients?",
            answers: [
                {
                    title: "Tomato",
                    imageUrl: "./assets/image/tomato.png"
                },
                {
                    title: "Cucumber",
                    imageUrl: "./assets/image/cucumber.png"
                },
                {
                    title: "Lettuce",
                    imageUrl: "./assets/image/salad.png"
                },
                {
                    title: "Onion",
                    imageUrl: "./assets/image/onion.png"
                }
            ],
            type: "checkbox"
        },
        {
            question: "Add sauce?",
            answers: [
                {
                    title: "Garlic",
                    imageUrl: "./assets/image/sauce1.png"
                },
                {
                    title: "Ketchup",
                    imageUrl: "./assets/image/sauce2.png"
                },
                {
                    title: "Mustard",
                    imageUrl: "./assets/image/sauce3.png"
                }
            ],
            type: "radio"
        }
    ];

    if (document.documentElement.clientWidth < 768) {
        burgerButton.style.display = "flex"
    } else {
        burgerButton.style.display = "none"
    };

    window.addEventListener("resize", () => {
        if (document.documentElement.clientWidth < 768) {
            burgerButton.style.display = "flex"
        } else {
            burgerButton.style.display = "none"
        }
    });

    buttonOpenModal.addEventListener("click", () => {
        modalBlock.classList.add("d-block");
        playTest();
    });

    burgerButton.addEventListener("click", () => {
        modalBlock.classList.add("d-block");
        playTest();
    });

    closeModal.addEventListener("click", function () {
        modalBlock.classList.remove("d-block");
    });

    const playTest = () => {
        let numberOfQuestion = 0;
        const finalAnswer = [];

        const renderAnswers = (index) => {
            questions[index].answers.forEach((answer) => {
                const answerItem = document.createElement("div");

                answerItem.classList.add("answers-item", "d-flex", "flex-column");

                answerItem.innerHTML = `
                    <input type="${questions[index].type}" id="${answer.title}" name="answer" class="d-none" value="${answer.title}">
                    <label for="${answer.title}" class="d-flex flex-column justify-content-between">
                        <img class="answerImg" src="${answer.imageUrl}" alt="burger">
                        <span>${answer.title}</span>
                    </label>
                `
                formAnswers.appendChild(answerItem);
            })
        };
        const renderQuestions = (indexQuestion) => {
            formAnswers.innerHTML = "";

            switch (true) {
                case (numberOfQuestion === 0): 
                    questionTitle.textContent = `${questions[indexQuestion].question}`;
                    renderAnswers(indexQuestion);
                    nextButton.classList.remove("d-none");
                    previousButton.classList.add("d-none");
                break;

                case (numberOfQuestion > 0 && numberOfQuestion <= (questions.length - 1)): 
                    questionTitle.textContent = `${questions[indexQuestion].question}`;
                    renderAnswers(indexQuestion);
                    nextButton.classList.remove("d-none");
                    previousButton.classList.remove("d-none");
                    sendButton.classList.add("d-none");
                break;

                case (numberOfQuestion === questions.length):
                    nextButton.classList.add("d-none");
                    previousButton.classList.add("d-none");
                    sendButton.classList.remove("d-none");

                    questionTitle.textContent = "Enter your phone and name";
                    formAnswers.innerHTML = `
                        <div class="form-group">
                            <label for="number-phone" class="form-label">Enter your phone number:</label>
                            <input type="phone" class="form-control" id="number-phone" autofocus>
                            <label for="client-name" class="form-label">Type your name:</label>
                            <input type="name" class="form-control" id="client-name">
                        </div>
                    `;
                break;

                case (numberOfQuestion === questions.length + 1):
                    sendButton.classList.add("d-none");
                    questionTitle.textContent = "Thank You!";
                    formAnswers.innerHTML = `
                        <span style="text-align:center">
                            Your order is accepted!<br>
                            Our manager will call you back.
                        </span>
                    `;
                    setTimeout(() => {
                        modalBlock.classList.remove("d-block");
                    }, 2000);
                break;
            }
        };

        renderQuestions(numberOfQuestion);

        const checkAnswers = () => {
            const obj = [];

            const inputs = [...formAnswers.elements].filter((input) => input.checked || input.id === "number-phone" || input.id === "client-name");
            const inputName = document.getElementById("client-name");
            const inputPhone = document.getElementById("number-phone");

            inputs.forEach((input, index) => {
                if (numberOfQuestion >= 0 && numberOfQuestion <= (questions.length - 1)) {
                    obj[`${index}_${questions[numberOfQuestion].question}`] = input.value;
                }
                if (numberOfQuestion === questions.length) { 
                    obj["Client phone"] = +inputPhone.value;
                    obj["Client name"] = inputName.value;
                }
            })

            finalAnswer.push(obj);
        };

        nextButton.onclick = () => {
            checkAnswers();
            numberOfQuestion++;
            renderQuestions(numberOfQuestion);
        };

        previousButton.onclick = () => {
            numberOfQuestion--;
            renderQuestions(numberOfQuestion);
        };

        sendButton.onclick = () => {
            checkAnswers();
            numberOfQuestion++;
            renderQuestions(numberOfQuestion);
            console.log(finalAnswer);
        }
    }
});

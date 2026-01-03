const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');

const myQuestions = [
    {
        question: "1. Segundo a Lei nº 8.080/1990, o dever do Estado de garantir a saúde consiste em:",
        answers: {
            a: "Formular e executar políticas econômicas e sociais que visem à redução de riscos.",
            b: "Prestar assistência às pessoas apenas quando houver agravos agudos.",
            c: "Garantir o acesso universal e igualitário exclusivamente às ações de cura.",
            d: "Isentar a responsabilidade das pessoas e da família sobre a saúde."
        },
        correctAnswer: "a"
    },
    {
        question: "2. No Código de Ética de Enfermagem, assinale a alternativa que descreve um DIREITO do profissional:",
        answers: {
            a: "Registrar no prontuário as informações inerentes à assistência.",
            b: "Prestar assistência livre de danos por imperícia ou negligência.",
            c: "Recusar-se a executar atividades que não sejam de sua competência técnica e legal.",
            d: "Exercer a profissão com justiça, equidade e dignidade."
        },
        correctAnswer: "c"
    },
    {
        question: "3. Qual músculo é a primeira escolha para grandes volumes e substâncias irritantes em adultos (Ventro-glúteo)?",
        answers: {
            a: "Deltoide",
            b: "Ventro-glúteo (Técnica de Hochstetter)",
            c: "Vasto lateral da coxa",
            d: "Dorso-glúteo"
        },
        correctAnswer: "b"
    },
    {
        question: "4. A Lei nº 8.142/1990 estabelece que as Conferências de Saúde devem se reunir a cada:",
        answers: {
            a: "1 ano",
            b: "2 anos",
            c: "4 anos",
            d: "5 anos"
        },
        correctAnswer: "c"
    },
    {
        question: "5. Quais são os dois identificadores padrão recomendados para a identificação correta do paciente?",
        answers: {
            a: "Nome completo e número do prontuário",
            b: "Nome completo e data de nascimento",
            c: "Nome da mãe e número do leito",
            d: "Nome completo e diagnóstico"
        },
        correctAnswer: "b"
    },
    {
        question: "6. Qual a relação compressão/ventilação em um adulto com dois socorristas (Diretrizes AHA)?",
        answers: {
            a: "15:2",
            b: "30:2",
            c: "30:5",
            d: "10:1"
        },
        correctAnswer: "b"
    },
    {
        question: "7. A vacina BCG, que protege contra formas graves da tuberculose, é administrada por via:",
        answers: {
            a: "Subcutânea",
            b: "Intramuscular",
            c: "Intradérmica",
            d: "Oral"
        },
        correctAnswer: "c"
    },
    {
        question: "8. Em acidente com perfurocortante, qual a primeira medida imediata a ser tomada?",
        answers: {
            a: "Notificar a chefia imediata",
            b: "Iniciar a quimioprofilaxia (coquetel)",
            c: "Lavar o local com água e sabão ou soro fisiológico",
            d: "Aplicar álcool 70% e cobrir com curativo"
        },
        correctAnswer: "c"
    },
    {
        question: "9. Prescrito 500mg de Amoxicilina. Disponível 250mg/5ml. Quantos ml administrar?",
        answers: {
            a: "5 ml",
            b: "7,5 ml",
            c: "10 ml",
            d: "12 ml"
        },
        correctAnswer: "c"
    },
    {
        question: "10. No manejo da Dengue, qual medicamento é CONTRAINDICADO por risco de hemorragia?",
        answers: {
            a: "Dipirona",
            b: "Paracetamol",
            c: "Ácido Acetilsalicílico (Aspirina)",
            d: "Soro de Reidratação Oral"
        },
        correctAnswer: "c"
    }
];

function buildQuiz() {
    const output = [];
    myQuestions.forEach((currentQuestion, questionNumber) => {
        const answers = [];
        for (letter in currentQuestion.answers) {
            answers.push(
                `<label>
                    <input type="radio" name="question${questionNumber}" value="${letter}">
                    ${letter}) ${currentQuestion.answers[letter]}
                </label>`
            );
        }
        output.push(
            `<div class="question-container">
                <div class="question"> ${currentQuestion.question} </div>
                <div class="answers"> ${answers.join('')} </div>
            </div>`
        );
    });
    quizContainer.innerHTML = output.join('');
}

function showResults() {
    const answerContainers = quizContainer.querySelectorAll('.answers');
    let numCorrect = 0;

    myQuestions.forEach((currentQuestion, questionNumber) => {
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;

        if (userAnswer === currentQuestion.correctAnswer) {
            numCorrect++;
            answerContainers[questionNumber].classList.add('correct-style');
        } else {
            answerContainers[questionNumber].classList.add('wrong-style');
        }
    });

    let mensagem = "";
    if(numCorrect >= 8) mensagem = "🔥 Incrível! Você está pronta para a FAFIPA!";
    else if(numCorrect >= 5) mensagem = "👍 Muito bom! Só mais um pouco de revisão.";
    else mensagem = "📚 Vamos revisar mais um pouco? Você consegue!";

    resultsContainer.innerHTML = `
        <div style="background: #e0f2f1; padding: 20px; border-radius: 15px; border: 2px solid #00796b;">
            <h3>Resultado Final</h3>
            <p style="font-size: 1.5rem;">${numCorrect} de ${myQuestions.length} acertos</p>
            <p><em>${mensagem}</em></p>
        </div>
    `;
    window.scrollTo(0, document.body.scrollHeight);
}

buildQuiz();
submitButton.addEventListener('click', showResults);

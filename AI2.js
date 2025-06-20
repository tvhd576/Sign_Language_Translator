// ==== script.js HOÀN CHẮNH ====

const videoElement = document.getElementById('inputVideo');
const canvasElement = document.getElementById('outputCanvas');
const canvasCtx = canvasElement.getContext('2d');
const resultDiv = document.getElementById('result');

// New UI elements
const toggleCameraBtn = document.getElementById('toggleCamera');
const captureSignBtn = document.getElementById('captureSign');
const toggleFullscreenBtn = document.getElementById('toggleFullscreen');
const signHistoryList = document.getElementById('sign-history');
const clearHistoryBtn = document.getElementById('clearHistory');
const practiceTargetDiv = document.getElementById('practice-target');
const nextSignBtn = document.getElementById('nextSign');
const practiceFeedbackDiv = document.getElementById('practice-feedback');
const aboutLink = document.getElementById('about-link');
const helpLink = document.getElementById('help-link');
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modal-content');
const closeModal = document.querySelector('.close-modal');

// Tab navigation elements
const practiceTab = document.getElementById('practice-tab');
const learnTab = document.getElementById('learn-tab');
const dictionaryTab = document.getElementById('dictionary-tab');
const challengeTab = document.getElementById('challenge-tab');
const practiceContent = document.getElementById('practice-content');
const learnContent = document.getElementById('learn-content');
const dictionaryContent = document.getElementById('dictionary-content');
const challengeContent = document.getElementById('challenge-content');

// Challenge Mode elements
const challengeIntro = document.getElementById('challenge-intro');
const challengeGame = document.getElementById('challenge-game');
const challengeResults = document.getElementById('challenge-results');
const difficultyBtns = document.querySelectorAll('.difficulty-btn');
const challengeTime = document.getElementById('challenge-time');
const challengeScore = document.getElementById('challenge-score');
const challengeTarget = document.getElementById('challenge-target');
const challengeFeedback = document.getElementById('challenge-feedback');
const challengeProgressFill = document.getElementById('challenge-progress-fill');
const challengeProgressText = document.getElementById('challenge-progress-text');
const finalScore = document.getElementById('final-score');
const signsCompleted = document.getElementById('signs-completed');
const totalSigns = document.getElementById('total-signs');
const timeTaken = document.getElementById('time-taken');
const tryAgainBtn = document.getElementById('try-again');
const shareResultsBtn = document.getElementById('share-results');
// Learning mode elements
const progressFill = document.querySelector('.progress-fill');
const progressText = document.querySelector('.progress-text');
const lessonTitle = document.querySelector('.lesson-title');
const prevStepBtn = document.getElementById('prevStep');
const nextStepBtn = document.getElementById('nextStep');
const lessonBtns = document.querySelectorAll('.lesson-btn');

let poseLandmarks = null;
let previousX = null;
let waveCount = 0;
let lastSign = "Unknown";
let isCameraOn = true;
let isPracticeMode = false;
let signHistory = [];
let practiceSignList = ["Hello 👋", "Yes 👍", "Bye 👋", "Please 🙏", "Thank You 🙏", "Love ❤️"];
let currentPracticeSign = "";

// Challenge Mode variables
let isChallengeModeActive = false;
let challengeTimer = null;
let challengeTimeRemaining = 60;
let currentChallengeSign = "";
let currentChallengeScore = 0;
let currentChallengeIndex = 0;
let challengeSigns = [];
let challengeStartTime = 0;
let challengeDifficulty = "";
// Challenge difficulty settings
const challengeSettings = {
    easy: {
        time: 60,
        signs: ["Hello 👋", "Yes 👍", "Bye 👋", "Please 🙏", "Thank You 🙏"],
        pointsPerSign: 10
    },
    medium: {
        time: 45,
        signs: ["Hello 👋", "Yes 👍", "Bye 👋", "Please 🙏", "Thank You 🙏", "Love ❤️"],
        pointsPerSign: 15
    },
    hard: {
        time: 30,
        signs: ["Hello 👋", "Yes 👍", "Bye 👋", "Please 🙏", "Thank You 🙏", "Love ❤️", "How are you? 🤔", "Happy 😊"],
        pointsPerSign: 20
    }
};

// Learning mode variables
let currentLesson = 1;
let currentStep = 1;
let totalSteps = 4;
let lessonData = [
    {
        title: "Lesson 1: Hello Sign",
        steps: [
            {
                title: "Step 1: Position",
                description: "Stand facing the camera with your upper body visible.",
                icon: "👤"
            },
            {
                title: "Step 2: Hand Position",
                description: "Extend your index finger while keeping other fingers closed.",
                icon: "👆"
            },
            {
                title: "Step 3: Movement",
                description: "Bring your index finger near your eye.",
                icon: "👋"
            },
            {
                title: "Step 4: Practice",
                description: "Now try the complete sign and hold it for recognition.",
                icon: "👋"
            }
        ]
    },
    {
        title: "Lesson 2: Yes Sign",
        steps: [
            {
                title: "Step 1: Position",
                description: "Stand facing the camera with your upper body visible.",
                icon: "👤"
            },
            {
                title: "Step 2: Hand Position",
                description: "Make a fist with your hand.",
                icon: "✊"
            },
            {
                title: "Step 3: Movement",
                description: "Extend your thumb upward while keeping other fingers closed.",
                icon: "👍"
            },
            {
                title: "Step 4: Practice",
                description: "Now try the complete sign and hold it for recognition.",
                icon: "👍"
            }
        ]
    },
    {
        title: "Lesson 3: Bye Sign",
        steps: [
            {
                title: "Step 1: Position",
                description: "Stand facing the camera with your upper body visible.",
                icon: "👤"
            },
            {
                title: "Step 2: Hand Position",
                description: "Open your palm with fingers extended.",
                icon: "✋"
            },
            {
                title: "Step 3: Movement",
                description: "Move your hand side to side in a waving motion.",
                icon: "👋"
            },
            {
                title: "Step 4: Practice",
                description: "Now try the complete sign and hold it for recognition.",
                icon: "👋"
            }
        ]
    },
    {
        title: "Lesson 4: Please Sign",
        steps: [
            {
                title: "Step 1: Position",
                description: "Stand facing the camera with your upper body visible.",
                icon: "👤"
            },
            {
                title: "Step 2: Hand Position",
                description: "Extend your hand with palm open.",
                icon: "✋"
            },
            {
                title: "Step 3: Movement",
                description: "Position your hand at chest level.",
                icon: "🙏"
            },
            {
                title: "Step 4: Practice",
                description: "Now try the complete sign and hold it for recognition.",
                icon: "🙏"
            }
        ]
    },
    {
        title: "Lesson 5: Thank You Sign",
        steps: [
            {
                title: "Step 1: Position",
                description: "Stand facing the camera with your upper body visible.",
                icon: "👤"
            },
            {
                title: "Step 2: Hand Position",
                description: "Extend your index finger while keeping other fingers closed.",
                icon: "👆"
            },
            {
                title: "Step 3: Movement",
                description: "Touch your finger near your mouth.",
                icon: "🙏"
            },
            {
                title: "Step 4: Practice",
                description: "Now try the complete sign and hold it for recognition.",
                icon: "🙏"
            }
        ]
    },
    {
        title: "Lesson 6: Love Sign",
        steps: [
            {
                title: "Step 1: Position",
                description: "Stand facing the camera with your upper body visible.",
                icon: "👤"
            },
            {
                title: "Step 2: Hand Position",
                description: "Extend both hands with palms open.",
                icon: "✋"
            },
            {
                title: "Step 3: Movement",
                description: "Bring both hands together at chest level.",
                icon: "❤️"
            },
            {
                title: "Step 4: Practice",
                description: "Now try the complete sign and hold it for recognition.",
                icon: "❤️"
            }
        ]
    }
];

// MediaPipe Pose
const pose = new Pose({
    locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`
});
pose.setOptions({
    modelComplexity: 1,
    smoothLandmarks: true,
    minDetectionConfidence: 0.7,
    minTrackingConfidence: 0.7
});
pose.onResults(onPoseResults);

// MediaPipe Hands
const hands = new Hands({
    locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
});
hands.setOptions({
    maxNumHands: 2,
    modelComplexity: 1,
    minDetectionConfidence: 0.7,
    minTrackingConfidence: 0.7
});
hands.onResults(onHandResults);

// Camera setup
const camera = new Camera(videoElement, {
    onFrame: async () => {
        try {
            await pose.send({ image: videoElement });
            await hands.send({ image: videoElement });
        } catch (error) {
            console.error("Camera processing error:", error);
        }
    },
    width: 640,
    height: 480
});
camera.start();

function onPoseResults(results) {
    if (results.poseLandmarks) {
        poseLandmarks = results.poseLandmarks;
    }
}

function onHandResults(results) {
    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    canvasCtx.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);

    if (poseLandmarks) {
        drawConnectors(canvasCtx, poseLandmarks, POSE_CONNECTIONS, { color: '#00FF00', lineWidth: 3 });
        drawLandmarks(canvasCtx, poseLandmarks, { color: '#FF0000', lineWidth: 1 });
    }

    if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
        const allHandLandmarks = results.multiHandLandmarks;
        const sign = detectComplexSign(poseLandmarks, allHandLandmarks);
        
        // Update result display
        resultDiv.innerText = `Detected: ${sign}`;
        resultDiv.classList.add('highlight');
        setTimeout(() => resultDiv.classList.remove('highlight'), 1000);
        
        // Add to history if sign changed
        if (sign !== lastSign && sign !== "Unknown") {
            addToHistory(sign);
        }
        
        // Check practice mode
        if (isPracticeMode && sign === currentPracticeSign) {
            practiceFeedbackDiv.innerText = "Great job! 🎉";
            practiceFeedbackDiv.classList.add('success');
            setTimeout(() => {
                practiceFeedbackDiv.classList.remove('success');
                setNextPracticeSign();
            }, 2000);
        }
        
        // Check challenge mode
        if (isChallengeModeActive && sign === currentChallengeSign) {
            // Update score
            currentChallengeScore += challengeSettings[challengeDifficulty].pointsPerSign;
            challengeScore.textContent = currentChallengeScore;
            
            // Show success feedback
            challengeFeedback.textContent = "Correct! +" + challengeSettings[challengeDifficulty].pointsPerSign + " points";
            challengeFeedback.classList.add('success');
            
            // Move to next sign
            currentChallengeIndex++;
            updateChallengeProgress();
            
            // Short delay before next sign
            setTimeout(() => {
                setNextChallengeSign();
            }, 1500);
        }   
        
        // Check learning mode - only in step 4 (practice step)
        if (currentStep === 4 && learnContent.style.display !== 'none') {
            const expectedSign = practiceSignList[currentLesson - 1];
            if (sign === expectedSign) {
                // Show success message
                showModal(`
                    <h2>Congratulations! 🎉</h2>
                    <p>You've successfully completed the "${expectedSign}" sign!</p>
                    <p>Would you like to continue to the next lesson or practice more?</p>
                    <div style="display: flex; justify-content: space-between; margin-top: 1rem;">
                        <button id="practice-more" class="btn">Practice More</button>
                        <button id="next-lesson" class="btn">Next Lesson</button>
                    </div>
                `);
                
                // Add event listeners to modal buttons
                document.getElementById('practice-more').addEventListener('click', () => {
                    modal.style.display = 'none';
                });
                
                document.getElementById('next-lesson').addEventListener('click', () => {
                    modal.style.display = 'none';
                    if (currentLesson < lessonData.length) {
                        changeLesson(currentLesson + 1);
                    }
                });
            }
        }
        
        lastSign = sign;

        for (const landmarks of allHandLandmarks) {
            drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS, { color: '#00FF00', lineWidth: 3 });
            drawLandmarks(canvasCtx, landmarks, { color: '#FF0000', lineWidth: 1 });
        }
    } else {
        resultDiv.innerText = "No Hand Detected";
    }

    canvasCtx.restore();
}

function distance(a, b) {
    return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
}

function detectComplexSign(poseLandmarks, allHandLandmarks) {
    if (!poseLandmarks || !allHandLandmarks) return "Unknown";

    const rightEye = poseLandmarks[5];
    const leftEye = poseLandmarks[2];
    const mouth = poseLandmarks[0];
    const leftShoulder = poseLandmarks[11];
    const rightShoulder = poseLandmarks[12];

    if (allHandLandmarks.length === 1) {
        const hand = allHandLandmarks[0];
        const indexFingerTip = hand[8];
        const thumbTip = hand[4];
        const middleTip = hand[12];
        const ringTip = hand[16];
        const pinkyTip = hand[20];

        // Hello
        if (distance(rightEye, indexFingerTip) < 0.1 || distance(leftEye, indexFingerTip) < 0.1) {
            return "Hello 👋";
        }

        // Yes (Thumbs Up)
        if (thumbTip.y < indexFingerTip.y && thumbTip.y < middleTip.y && thumbTip.y < ringTip.y && thumbTip.y < pinkyTip.y) {
            return "Yes 👍";
        }

        // Bye (Vãy tay)
        const handX = indexFingerTip.x;
        if (previousX !== null) {
            if (Math.abs(handX - previousX) > 0.03) {
                waveCount++;
            }
            if (waveCount >= 6) {
                waveCount = 0;
                previousX = handX;
                return "Bye 👋";
            }
        }
        previousX = handX;

        // Please
        const chestY = (leftShoulder.y + rightShoulder.y) / 2;
        if (Math.abs(indexFingerTip.y - chestY) < 0.07) {
            return "Please 🙏";
        }

        // Thank You (Tay chạm gần miệng)
        if (distance(mouth, indexFingerTip) < 0.1) {
            return "Thank You 🙏";
        }
    }

    if (allHandLandmarks.length === 2) {
        const hand1 = allHandLandmarks[0];
        const hand2 = allHandLandmarks[1];

        const hand1Index = hand1[8];
        const hand2Index = hand2[8];

        const chestY = (leftShoulder.y + rightShoulder.y) / 2;

        // Love
        if (distance(hand1Index, hand2Index) < 0.15) {
            if (Math.abs(hand1Index.y - chestY) < 0.1 && Math.abs(hand2Index.y - chestY) < 0.1) {
                return "Love ❤️";
            }
        }
    }

    return lastSign;
}

// New functions for enhanced features
function addToHistory(sign) {
    // Add to history array
    signHistory.unshift(sign);
    if (signHistory.length > 10) signHistory.pop();
    
    // Update UI
    updateHistoryDisplay();
}

function updateHistoryDisplay() {
    signHistoryList.innerHTML = '';
    signHistory.forEach(sign => {
        const li = document.createElement('li');
        li.textContent = sign;
        li.addEventListener('click', () => {
            // Set as practice target when clicked
            currentPracticeSign = sign;
            practiceTargetDiv.textContent = sign;
            practiceFeedbackDiv.innerText = "Waiting for sign...";
            isPracticeMode = true;
        });
        signHistoryList.appendChild(li);
    });
}

function setNextPracticeSign() {
    // Get random sign that's different from current
    let newSign;
    do {
        newSign = practiceSignList[Math.floor(Math.random() * practiceSignList.length)];
    } while (newSign === currentPracticeSign && practiceSignList.length > 1);
    
    currentPracticeSign = newSign;
    practiceTargetDiv.textContent = newSign;
    practiceFeedbackDiv.innerText = "Waiting for sign...";
}

function toggleCamera() {
    if (isCameraOn) {
        // Pause camera
        videoElement.pause();
        toggleCameraBtn.innerHTML = '<i class="fas fa-video-slash"></i>';
    } else {
        // Resume camera
        videoElement.play();
        toggleCameraBtn.innerHTML = '<i class="fas fa-video"></i>';
    }
    isCameraOn = !isCameraOn;
}

function captureSign() {
    // Create a snapshot of the current canvas
    const snapshot = document.createElement('canvas');
    snapshot.width = canvasElement.width;
    snapshot.height = canvasElement.height;
    snapshot.getContext('2d').drawImage(canvasElement, 0, 0);
    
    // Create download link
    const link = document.createElement('a');
    link.download = `sign-${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.png`;
    link.href = snapshot.toDataURL();
    link.click();
}

function toggleFullscreen() {
    if (!document.fullscreenElement) {
        canvasElement.requestFullscreen().catch(err => {
            console.error(`Error attempting to enable full-screen mode: ${err.message}`);
        });
    } else {
        document.exitFullscreen();
    }
}

function showModal(content) {
    modalContent.innerHTML = content;
    modal.style.display = 'block';
}

// Event listeners for new UI elements
toggleCameraBtn.addEventListener('click', toggleCamera);
captureSignBtn.addEventListener('click', captureSign);
toggleFullscreenBtn.addEventListener('click', toggleFullscreen);
clearHistoryBtn.addEventListener('click', () => {
    signHistory = [];
    updateHistoryDisplay();
});
nextSignBtn.addEventListener('click', () => {
    isPracticeMode = true;
    setNextPracticeSign();
});

aboutLink.addEventListener('click', (e) => {
    e.preventDefault();
    showModal(`
        <h2>About Sign Language Translator</h2>
        <p>This application uses computer vision to recognize and translate sign language gestures in real-time.</p>
        <p>Powered by MediaPipe and TensorFlow, it can detect hand and body positions to interpret common signs.</p>
        <p>Use this tool to learn and practice sign language in an interactive way.</p>
    `);
});

helpLink.addEventListener('click', (e) => {
    e.preventDefault();
    showModal(`
        <h2>How to Use</h2>
        <ol>
            <li>Allow camera access when prompted</li>
            <li>Position yourself so your upper body is visible</li>
            <li>Perform one of the signs shown in the instruction cards</li>
            <li>The system will detect and display the recognized sign</li>
            <li>Use Practice Mode to test your signing skills</li>
        </ol>
    `);
});

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Initialize practice mode
setNextPracticeSign();

// Add animation classes after page load
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.gesture-card').forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('animate-in');
        }, index * 100);
    });
});

// New functions for Learning Mode
function updateLearningUI() {
    // Update progress bar
    const progressPercentage = (currentStep / totalSteps) * 100;
    progressFill.style.width = `${progressPercentage}%`;
    progressText.textContent = `Lesson ${currentLesson} of ${lessonData.length} - Step ${currentStep} of ${totalSteps}`;
    
    // Update lesson title
    lessonTitle.textContent = lessonData[currentLesson - 1].title;
    
    // Update step visibility
    document.querySelectorAll('.lesson-step').forEach((step, index) => {
        if (index + 1 === currentStep) {
            step.classList.add('active');
        } else {
            step.classList.remove('active');
        }
    });
    
    // Update step content
    const steps = lessonData[currentLesson - 1].steps;
    document.querySelectorAll('.lesson-step').forEach((stepEl, index) => {
        const stepData = steps[index];
        stepEl.querySelector('h3').textContent = stepData.title;
        stepEl.querySelector('p').textContent = stepData.description;
        stepEl.querySelector('.step-image').textContent = stepData.icon;
    });
    
    // Update navigation buttons
    prevStepBtn.disabled = currentStep === 1;
    nextStepBtn.textContent = currentStep === totalSteps ? "Finish" : "Next Step";
}

function changeStep(step) {
    currentStep = step;
    updateLearningUI();
}

function changeLesson(lesson) {
    currentLesson = lesson;
    currentStep = 1;
    
    // Update active lesson button
    lessonBtns.forEach(btn => {
        if (parseInt(btn.dataset.lesson) === currentLesson) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    updateLearningUI();
}

function switchTab(tab) {
    // Hide all content
    practiceContent.style.display = 'none';
    learnContent.style.display = 'none';
    dictionaryContent.style.display = 'none';
    challengeContent.style.display = 'none';
    
    // Remove active class from all tabs
    practiceTab.classList.remove('active');
    learnTab.classList.remove('active');
    dictionaryTab.classList.remove('active');
    challengeTab.classList.remove('active');
    
    // Show selected content and activate tab
    if (tab === 'practice') {
        practiceContent.style.display = 'block';
        practiceTab.classList.add('active');
        isPracticeMode = true;
        isChallengeModeActive = false;
    } else if (tab === 'learn') {
        learnContent.style.display = 'block';
        learnTab.classList.add('active');
        updateLearningUI();
        isPracticeMode = false;
        isChallengeModeActive = false;
    } else if (tab === 'dictionary') {
        dictionaryContent.style.display = 'block';
        dictionaryTab.classList.add('active');
        isPracticeMode = false;
        isChallengeModeActive = false;
    } else if (tab === 'challenge') {
        challengeContent.style.display = 'block';
        challengeTab.classList.add('active');
        isPracticeMode = false;
        // Don't set isChallengeModeActive here, it will be set when a difficulty is selected
    }
}

// Event listeners for Learning Mode
prevStepBtn.addEventListener('click', () => {
    if (currentStep > 1) {
        changeStep(currentStep - 1);
    }
});

nextStepBtn.addEventListener('click', () => {
    if (currentStep < totalSteps) {
        changeStep(currentStep + 1);
    } else {
        // On last step, show completion message
        showModal(`
            <h2>Step Complete!</h2>
            <p>You've completed all steps for this lesson. Now practice the sign until it's recognized!</p>
        `);
    }
});

lessonBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const lessonNumber = parseInt(btn.dataset.lesson);
        changeLesson(lessonNumber);
    });
});

// Tab navigation event listeners
practiceTab.addEventListener('click', (e) => {
    e.preventDefault();
    switchTab('practice');
});

learnTab.addEventListener('click', (e) => {
    e.preventDefault();
    switchTab('learn');
});

dictionaryTab.addEventListener('click', (e) => {
    e.preventDefault();
    switchTab('dictionary');
});

challengeTab.addEventListener('click', (e) => {
    e.preventDefault();
    switchTab('challenge');
});

// Initialize learning mode
updateLearningUI();

// Dictionary elements
const dictionarySearchInput = document.getElementById('dictionary-search-input');
const searchBtn = document.getElementById('search-btn');
const categoryBtns = document.querySelectorAll('.category-btn');
const dictionaryResults = document.querySelector('.dictionary-results');
const signDetailModal = document.getElementById('sign-detail-modal');
const signDetailContent = document.getElementById('sign-detail-content');
const closeDetailModal = document.querySelector('.close-detail-modal');

// Dictionary data
const dictionaryData = [
    {
        id: 1,
        name: "Hello",
        icon: "👋",
        category: "greetings",
        shortDesc: "Wave near your face",
        fullDesc: "The 'Hello' sign is one of the most common greetings in sign language.",
        steps: [
            "Stand facing the person you're greeting",
            "Extend your index finger while keeping other fingers closed",
            "Bring your index finger near your eye",
            "Hold the position briefly to complete the sign"
        ]
    },
    {
        id: 2,
        name: "Yes",
        icon: "👍",
        category: "daily",
        shortDesc: "Thumbs up gesture",
        fullDesc: "The 'Yes' sign is a simple affirmative response used in everyday conversation.",
        steps: [
            "Make a fist with your hand",
            "Extend your thumb upward",
            "Hold the position to indicate agreement or affirmation"
        ]
    },
    {
        id: 3,
        name: "Bye",
        icon: "👋",
        category: "greetings",
        shortDesc: "Wave side to side",
        fullDesc: "The 'Bye' sign is used when parting ways with someone.",
        steps: [
            "Raise your hand with palm open",
            "Move your hand side to side in a waving motion",
            "Continue the motion briefly to clearly communicate the goodbye"
        ]
    },
    {
        id: 4,
        name: "Please",
        icon: "🙏",
        category: "daily",
        shortDesc: "Hand at chest level",
        fullDesc: "The 'Please' sign is used when making requests or asking for something politely.",
        steps: [
            "Extend your hand with palm open",
            "Position your hand at chest level",
            "Hold the position briefly to complete the sign"
        ]
    },
    {
        id: 5,
        name: "Thank You",
        icon: "🙏",
        category: "daily",
        shortDesc: "Touch near mouth",
        fullDesc: "The 'Thank You' sign expresses gratitude and appreciation.",
        steps: [
            "Extend your index finger",
            "Touch your finger near your mouth",
            "Move your hand slightly forward to complete the gesture"
        ]
    },
    {
        id: 6,
        name: "Love",
        icon: "❤️",
        category: "emotions",
        shortDesc: "Join hands at chest",
        fullDesc: "The 'Love' sign is a powerful way to express affection and caring.",
        steps: [
            "Extend both hands with palms open",
            "Bring both hands together at chest level",
            "Hold the position to express the emotion of love"
        ]
    },
    {
        id: 7,
        name: "How are you?",
        icon: "🤔",
        category: "questions",
        shortDesc: "Questioning gesture",
        fullDesc: "This sign is used to ask someone about their wellbeing or current state.",
        steps: [
            "Place your palm facing upward",
            "Move your hand in a slight arc motion",
            "Add a questioning facial expression to complete the sign"
        ]
    },
    {
        id: 8,
        name: "Happy",
        icon: "😊",
        category: "emotions",
        shortDesc: "Upward hand motion",
        fullDesc: "The 'Happy' sign expresses joy and positive emotions.",
        steps: [
            "Place your open hand on your chest",
            "Move your hand upward and outward",
            "Add a smile to emphasize the positive emotion"
        ]
    },
    {
        id: 9,
        name: "Sad",
        icon: "😢",
        category: "emotions",
        shortDesc: "Downward motion from face",
        fullDesc: "The 'Sad' sign communicates feelings of unhappiness or disappointment.",
        steps: [
            "Place your fingers near your eyes",
            "Move your hands downward along your face",
            "Add a sad facial expression to emphasize the emotion"
        ]
    },
    {
        id: 10,
        name: "What",
        icon: "❓",
        category: "questions",
        shortDesc: "Questioning gesture",
        fullDesc: "The 'What' sign is used to ask for information or clarification.",
        steps: [
            "Hold your hands out with palms facing up",
            "Shake your hands slightly",
            "Add a questioning facial expression"
        ]
    },
    {
        id: 11,
        name: "Where",
        icon: "🧭",
        category: "questions",
        shortDesc: "Pointing gesture",
        fullDesc: "The 'Where' sign is used to ask about location or direction.",
        steps: [
            "Hold your index finger up",
            "Move your finger in a small circle",
            "Add a questioning facial expression"
        ]
    },
    {
        id: 12,
        name: "Good Morning",
        icon: "🌅",
        category: "greetings",
        shortDesc: "Morning greeting gesture",
        fullDesc: "The 'Good Morning' sign is used as a greeting during the morning hours.",
        steps: [
            "Make the sign for 'good' by placing your right hand at your mouth",
            "Move your hand outward and downward",
            "Then make the sign for 'morning' by indicating the sun rising"
        ]
    }
];

// Dictionary functions
function renderDictionaryItems(items) {
    dictionaryResults.innerHTML = '';
    
    if (items.length === 0) {
        dictionaryResults.innerHTML = '<p class="no-results">No signs found matching your search.</p>';
        return;
    }
    
    items.forEach(item => {
        const dictionaryItem = document.createElement('div');
        dictionaryItem.className = 'dictionary-item';
        dictionaryItem.dataset.id = item.id;
        
        dictionaryItem.innerHTML = `
            <div class="dictionary-icon">${item.icon}</div>
            <h3>${item.name}</h3>
            <p>${item.shortDesc}</p>
        `;
        
        dictionaryItem.addEventListener('click', () => {
            showSignDetail(item);
        });
        
        dictionaryResults.appendChild(dictionaryItem);
    });
}

function showSignDetail(sign) {
    signDetailContent.innerHTML = `
        <div class="sign-detail-header">
            <div class="sign-detail-icon">${sign.icon}</div>
            <div class="sign-detail-title">
                <h2>${sign.name}</h2>
                <span class="sign-detail-category">${sign.category.charAt(0).toUpperCase() + sign.category.slice(1)}</span>
            </div>
        </div>
        
        <div class="sign-detail-description">
            <p>${sign.fullDesc}</p>
        </div>
        
        <div class="sign-detail-steps">
            <h3>How to Sign:</h3>
            <ol>
                ${sign.steps.map(step => `<li>${step}</li>`).join('')}
            </ol>
        </div>
        
        <div class="sign-detail-video">
            <h3>Video Demonstration:</h3>
            <div class="video-placeholder">
                <p><i class="fas fa-video"></i> Video demonstration coming soon</p>
            </div>
            <button class="btn practice-this-sign" data-sign="${sign.name} ${sign.icon}">Practice This Sign</button>
        </div>
    `;
    
    // Add event listener to practice button
    signDetailContent.querySelector('.practice-this-sign').addEventListener('click', () => {
        const signToPractice = sign.name + " " + sign.icon;
        currentPracticeSign = signToPractice;
        practiceTargetDiv.textContent = signToPractice;
        practiceFeedbackDiv.innerText = "Waiting for sign...";
        isPracticeMode = true;
        
        // Switch to practice tab
        switchTab('practice');
        
        // Close the modal
        signDetailModal.style.display = 'none';
    });
    
    signDetailModal.style.display = 'block';
}

function filterDictionary() {
    const searchTerm = dictionarySearchInput.value.toLowerCase();
    const activeCategory = document.querySelector('.category-btn.active').dataset.category;
    
    let filteredItems = dictionaryData;
    
    // Filter by category
    if (activeCategory !== 'all') {
        filteredItems = filteredItems.filter(item => item.category === activeCategory);
    }
    
    // Filter by search term
    if (searchTerm) {
        filteredItems = filteredItems.filter(item => 
            item.name.toLowerCase().includes(searchTerm) || 
            item.shortDesc.toLowerCase().includes(searchTerm) ||
            item.fullDesc.toLowerCase().includes(searchTerm)
        );
    }
    
    renderDictionaryItems(filteredItems);
}

// Dictionary event listeners
searchBtn.addEventListener('click', filterDictionary);

dictionarySearchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        filterDictionary();
    }
});

categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        categoryBtns.forEach(b => b.classList.remove('active'));
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        // Filter dictionary
        filterDictionary();
    });
});

if (closeDetailModal) {
    closeDetailModal.addEventListener('click', () => {
        signDetailModal.style.display = 'none';
    });
}

window.addEventListener('click', (e) => {
    if (e.target === signDetailModal) {
        signDetailModal.style.display = 'none';
    }
});

// Initialize dictionary
document.addEventListener('DOMContentLoaded', () => {
    // Initial render of all dictionary items
    renderDictionaryItems(dictionaryData);
});

// Challenge Mode functions
function startChallenge(difficulty) {
    challengeDifficulty = difficulty;
    const settings = challengeSettings[difficulty];
    
    // Reset challenge state
    challengeTimeRemaining = settings.time;
    currentChallengeScore = 0;
    currentChallengeIndex = 0;
    challengeSigns = [...settings.signs];
    
    // Shuffle the signs
    for (let i = challengeSigns.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [challengeSigns[i], challengeSigns[j]] = [challengeSigns[j], challengeSigns[i]];
    }
    
    // Update UI
    challengeTime.textContent = challengeTimeRemaining;
    challengeScore.textContent = currentChallengeScore;
    totalSigns.textContent = challengeSigns.length;
    
    // Set first sign
    setNextChallengeSign();
    
    // Update progress
    updateChallengeProgress();
    
    // Hide intro, show game
    challengeIntro.style.display = 'none';
    challengeGame.style.display = 'block';
    challengeResults.style.display = 'none';
    
    // Start timer
    challengeStartTime = Date.now();
    isChallengeModeActive = true;
    startChallengeTimer();
}

function startChallengeTimer() {
    challengeTimer = setInterval(() => {
        challengeTimeRemaining--;
        challengeTime.textContent = challengeTimeRemaining;
        
        if (challengeTimeRemaining <= 10) {
            challengeTime.parentElement.classList.add('pulse');
        }
        
        if (challengeTimeRemaining <= 0) {
            endChallenge();
        }
    }, 1000);
}

function setNextChallengeSign() {
    if (currentChallengeIndex < challengeSigns.length) {
        currentChallengeSign = challengeSigns[currentChallengeIndex];
        challengeTarget.textContent = currentChallengeSign;
        challengeFeedback.textContent = "Waiting for sign...";
        challengeFeedback.className = "challenge-feedback";
    } else {
        endChallenge();
    }
}

function updateChallengeProgress() {
    const progressPercentage = (currentChallengeIndex / challengeSigns.length) * 100;
    challengeProgressFill.style.width = `${progressPercentage}%`;
    challengeProgressText.textContent = `Sign ${currentChallengeIndex + 1} of ${challengeSigns.length}`;
}

function endChallenge() {
    // Clear timer
    clearInterval(challengeTimer);
    challengeTime.parentElement.classList.remove('pulse');
    
    // Calculate time taken
    const totalTimeTaken = Math.floor((Date.now() - challengeStartTime) / 1000);
    
    // Update results
    finalScore.textContent = currentChallengeScore;
    signsCompleted.textContent = currentChallengeIndex;
    timeTaken.textContent = totalTimeTaken;
    
    // Show results
    challengeGame.style.display = 'none';
    challengeResults.style.display = 'block';
    
    // Reset challenge mode
    isChallengeModeActive = false;
}

// Event listeners for Challenge Mode
difficultyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const difficulty = btn.dataset.difficulty;
        startChallenge(difficulty);
    });
});

tryAgainBtn.addEventListener('click', () => {
    // Reset to difficulty selection
    challengeIntro.style.display = 'block';
    challengeResults.style.display = 'none';
});

shareResultsBtn.addEventListener('click', () => {
    // Create a message to share
    const shareMessage = `I scored ${finalScore.textContent} points in the Sign Language Challenge (${challengeDifficulty.charAt(0).toUpperCase() + challengeDifficulty.slice(1)} difficulty)!`;
    
    // Try to use Web Share API if available
    if (navigator.share) {
        navigator.share({
            title: 'Sign Language Challenge Results',
            text: shareMessage
        }).catch(err => {
            console.error('Error sharing:', err);
            // Fallback: copy to clipboard
            copyToClipboard(shareMessage);
        });
    } else {
        // Fallback: copy to clipboard
        copyToClipboard(shareMessage);
    }
});

function copyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    
    // Show feedback
    showModal(`
        <h3>Results Copied!</h3>
        <p>Your challenge results have been copied to the clipboard.</p>
        <p>You can now paste and share them anywhere!</p>
    `);
}




const courseData = {
    'CS101': { credits: 3 },
    'MA201': { credits: 4 },
    'PH301': { credits: 3 },
};

const gradeWeights = {
    'S': 10,
    'A': 9,
    'B': 8,
    'C': 7,
    'D': 6,
    'E': 5,
    'U': 0
};

document.getElementById('courseForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const totalCourses = parseInt(document.getElementById('totalCourses').value);
    generateCourseInputs(totalCourses);
});

function generateCourseInputs(totalCourses) {
    const courseInputs = document.getElementById('courseInputs');
    courseInputs.innerHTML = '';
    
    for (let i = 0; i < totalCourses; i++) {
        courseInputs.innerHTML += `
            <div>
                <input type="text" placeholder="Course Code ${i+1}" class="courseCode" required>
                <input type="text" placeholder="Grade ${i+1}" class="courseGrade" required>
            </div>
        `;
    }
    
    document.getElementById('calculateCGPA').style.display = 'block';
}

document.getElementById('calculateCGPA').addEventListener('click', calculateCGPA);

function calculateCGPA() {
    const courseCodes = document.getElementsByClassName('courseCode');
    const courseGrades = document.getElementsByClassName('courseGrade');
    let totalWeightedCredits = 0;
    let totalCredits = 0;

    for (let i = 0; i < courseCodes.length; i++) {
        const courseCode = courseCodes[i].value.toUpperCase();
        const grade = courseGrades[i].value.toUpperCase();

        if (courseData[courseCode] && gradeWeights[grade] !== undefined) {
            const credits = courseData[courseCode].credits;
            const gradeWeight = gradeWeights[grade];
            totalWeightedCredits += credits * gradeWeight;
            totalCredits += credits;
        } else {
            alert(`Invalid course code or grade for course ${i+1}`);
            return;
        }
    }

    const cgpa = totalWeightedCredits / totalCredits;
    document.getElementById('result').innerHTML = `Your CGPA is: ${cgpa.toFixed(2)}`;
}
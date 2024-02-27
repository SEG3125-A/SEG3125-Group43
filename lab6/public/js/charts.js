// Client-side (JavaScript in the browser)
window.onload = function() {
    new Chart(document.getElementById('overallExperienceChart'), {
        type: 'pie',
        data: {
            labels: chartData.overallExperience.labels,
            datasets: [{
                data: chartData.overallExperience.data,
                backgroundColor: ['red', 'blue', 'green', 'yellow', 'purple']
            }]
        }
    });

    new Chart(document.getElementById('recommendationChart'), {
        type: 'pie',
        data: {
            labels: chartData.recommendation.labels,
            datasets: [{
                data: chartData.recommendation.data,
                backgroundColor: ['red', 'blue', 'green', 'yellow', 'purple']
            }]
        },
    });

    new Chart(document.getElementById('firstImpressionChart'), {
        type: 'pie',
        data: {
            labels: chartData.impression.labels,
            datasets: [{
                data: chartData.impression.data,
                backgroundColor: ['red', 'blue', 'green', 'yellow', 'purple']
            }]
        }
    });

    new Chart(document.getElementById('aspectsChart'), {
        type: 'pie',
        data: {
            labels: chartData.aspects.labels,
            datasets: [{
                data: chartData.aspects.data,
                backgroundColor: ['red', 'blue', 'green', 'yellow', 'purple']
            }]
        },
    });

    // And a displayer for the comments 
    const commentsDiv = document.getElementById('comments');

    chartData.comments.data.forEach((comment, index) => {
        const commentDiv = document.createElement('div');
        commentDiv.classList.add('mt-3', 'mb-5', 'p-3', 'border', 'border-dark', 'rounded');
        commentDiv.style.fontFamily = 'pp_telegrafregular, sans-serif';

        const userP = document.createElement('p');
        userP.textContent = chartData.comments.user[index];
        commentDiv.appendChild(userP);

        const commentP = document.createElement('p');
        commentP.textContent = comment;
        commentDiv.appendChild(commentP);

        commentsDiv.appendChild(commentDiv);
    });
}
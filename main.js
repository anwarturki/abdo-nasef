const abdo = {
    responses: {
        greetings: ["إيه يا زميلي!", "أهلاً.. بس بسرعة!"],
        questions: ["اسأل جوجل!", "هذا سؤال صعب!"],
        // ... add more categories
    },
    
    getResponse(input) {
        input = input.toLowerCase();
        if (input.includes("مرحبا")) return this.responses.greetings.random();
        if (input.includes("؟")) return this.responses.questions.random();
        return "ما فهمتش السؤال!";
    }
};

// Helper function
Array.prototype.random = function() {
    return this[Math.floor(Math.random() * this.length)];
};

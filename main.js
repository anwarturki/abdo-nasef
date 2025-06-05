const abdo = {
    responses: {
        greetings: ["أهلاً وسهلاً!", "إيه الأخبار؟", "مرحباً بك يا صديقي!"],
        questions: [
            "اسأل جوجل عشان يزعل!",
            "والله ما عندي فكرة!",
            "هذا سؤال يحتاج بحث...",
            "إسأل ChatGPT بيساعدك أكثر مني!"
        ],
        compliments: [
            "أنت أسطورة!",
            "والله مبدع!",
            "دايماً متميز!"
        ],
        farewell: [
            "مع السلامة!",
            "الله معاك!",
            "بالتوفيق!"
        ]
    },
    
    getResponse(input) {
        input = input.toLowerCase().trim();
        
        // تحسين التعرف على الجمل العربية
        if (/مرحبا|اهلا|هلا|السلام/.test(input)) {
            return this.responses.greetings.random();
        }
        
        if (/(\؟|\?|وش|ايه|كيف|متى|لماذا)$/.test(input)) {
            return this.responses.questions.random();
        }
        
        if (/شكرا|حلو|ممتاز|رائع/.test(input)) {
            return this.responses.compliments.random();
        }
        
        if (/باي|سلام|مع السلامة/.test(input)) {
            return this.responses.farewell.random();
        }
        
        return "آسف ما فهمت السؤال، ممكن تشرح بطريقة ثانية؟";
    }
};

// دالة المساعدة للاختيار العشوائي
Array.prototype.random = function() {
    return this[Math.floor(Math.random() * this.length)];
};

class SmartHike {
    constructor(username) {
        this.username = username;
        this.goals = {};
        this._listOfHikes = [];
        this.resources = 100;
    }

    get listOfHikes() {
        return this._listOfHikes;
    }

    addGoal(peak, altitude) {
        if (this.goals.hasOwnProperty(peak)) {
            return `${peak} has already been added to your goals`;
        }

        this.goals[peak] = altitude;
        return `You have successfully added a new goal - ${peak}`;
    }

    hike(peak, time, difficultyLevel) {
        if (!this.goals.hasOwnProperty(peak)) {
            throw new Error(`${peak} is not in your current goals`);
        }

        if (this.resources === 0) {
            throw new Error('You don\'t have enough resources to start the hike');
        }

        const diff = this.resources - (time * 10);

        if (diff < 0) {
            return 'You don\'t have enough resources to complete the hike';
        }

        this.resources = diff;

        this.listOfHikes.push({
            peak,
            time,
            difficultyLevel
        });

        return `You hiked ${peak} peak for ${time} hours and you have ${this.resources}% resources left`;
    }

    rest(time) {
        this.resources += time * 10;

        if (this.resources >= 100) {
            this.resources = 100;

            return 'Your resources are fully recharged. Time for hiking!';
        }

        return `You have rested for ${time} hours and gained ${time*10}% resources`;
    }

    showRecord(criteria) {
        const finded = this.listOfHikes.sort((a, b) => b.time - a.time).find(hike => hike.difficultyLevel === criteria);

        if (this.listOfHikes.length === 0) {
            return `${this.username} has not done any hiking yet`;
        }

        if (!finded && criteria !== 'all') {

            return `${this.username} has not done any ${criteria} hiking yet`;
        }

        if (criteria === 'all') {
            const result = ['All hiking records:'];

            this.listOfHikes.forEach(hike => {
                result.push(`${this.username} hiked ${hike.peak} for ${hike.time} hours`);
            });

            return result.join('\n');
        }



        return `${this.username}'s best ${criteria} hike is ${this.listOfHikes[0].peak} peak, for ${this.listOfHikes[0].time} hours`;
    }
}

// const user = new SmartHike('Vili');
// console.log(user.addGoal('Musala', 2925));
// console.log(user.addGoal('Rui', 1706));
// console.log(user.addGoal('Musala', 2925));

// const user = new SmartHike('Vili');
// console.log(user.addGoal('Musala', 2925));
// console.log(user.addGoal('Rui', 1706));
// console.log(user.hike('Musala', 8, 'hard'));
// console.log(user.hike('Rui', 3, 'easy'));
// console.log(user.hike('Everest', 12, 'hard'));

const user = new SmartHike('Vili');
user.addGoal('Musala', 2925);
user.hike('Musala', 8, 'hard');
console.log(user.showRecord('easy'));
user.addGoal('Vihren', 2914);
user.hike('Vihren', 4, 'hard');
console.log(user.showRecord('hard'));
user.addGoal('Rui', 1706);
user.hike('Rui', 3, 'easy');
console.log(user.showRecord('all'));
// 原文讲解：https://zhuanlan.zhihu.com/p/351750593

// 观察者模式
const subject = (function () {
    const observers = [];

    function subscribe(observer) {
        console.log("New subscription coming!");
        observers.push(observer);
    }

    function notify(params) {
        for (let i = 0; i < observers.length; i++) {
            try {
                observers[i] && observers[i](params);
            } catch (error) {
                console.error(error);
            }
        }
    }

    function fire(parmas) {
        console.log("Fire!");
        notify(parmas);
    }

    return {
        subscribe,
        fire
    };
})();

// const observer1 = (args) => {
//     console.log("This is Observer1, Let me process the event");
//     console.log(JSON.stringify(args, null, 4));
// };

// const observer2 = (args) => {
//     console.log("This is Observer2, Let me process the event");
//     console.log(JSON.stringify(args, null, 4));
// };

// subject.subscribe(observer1);
// subject.subscribe(observer2);

// subject.fire({ message: "hello world" });
// subject.fire({ value: 2021 });

// 发布订阅模式
const broker = (function () {
    const topicSubscribers = {};

    function subscribe(topic, callback) {
        console.log(`New subscription for topic [${topic}] coming!`);
        if (topicSubscribers[topic]) {
            topicSubscribers[topic].push(callback);
        } else {
            topicSubscribers[topic] = [callback];
        }
    }

    function notify(topic, params) {
        if (topicSubscribers[topic]) {
            const subscribers = topicSubscribers[topic];
            for (let i = 0; i < subscribers.length; i++) {
                try {
                    subscribers[i] && subscribers[i](params);
                } catch (error) {
                    console.error(error);
                    // 避免影响其他subscriber
                }
            }
        }
    }

    function fire(topic, params) {
        console.log(`Fire for topic [${topic}]!`);
        notify(topic, params);
    }

    return {
        subscribe,
        fire
    };
})();

const subscriber1 = (args) => {
    console.log("This is Subscriber1, Let me process the event");
    console.log(JSON.stringify(args, null, 4));
};
broker.subscribe("topic1", subscriber1);

const subscriber2 = (args) => {
    console.log("This is Subscriber2, Let me process the event");
    console.log(JSON.stringify(args, null, 4));
};
broker.subscribe("topic2", subscriber2);

const publisher1 = (function () {
    return {
        publishTopic1: function () {
            broker.fire("topic1", { message: "Hello World" });
        },
        publishTopic2: function () {
            broker.fire("topic2", { value: 2021 });
        }
    };
})();

const publisher2 = (function () {
    return {
        publishTopic1: function () {
            broker.fire("topic1", { message: "Hello FreewheelLee" });
        },
        publishTopic2: function () {
            broker.fire("topic2", { value: 955 });
        }
    };
})();

publisher1.publishTopic1();
publisher1.publishTopic2();

publisher2.publishTopic1();
publisher2.publishTopic2();

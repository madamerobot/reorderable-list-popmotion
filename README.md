# Re-orderable list with Popmotion Pose
___

### How to: Run this app

```
git clone git@github.com:madamerobot/reorderable-list-popmotion.git
npm install
npm start
```
You should be able to access your app on https://localhost:3000

### Challenge: Spring Physics Animation
Build a list based on Cheng Lous' [React Motion Demo](http://chenglou.github.io/react-motion/demos/demo8-draggable-list/) (see below) which re-orders itself on drag-and-drop and animates to the new position via spring-style animation.

↓ Reference animation ↓

![Draggable List by Cheng Lous](https://duaw26jehqd4r.cloudfront.net/items/2g1T200O1J2G0F3S1B3G/Screen%20Recording%202019-02-08%20at%2003.37%20PM.gif)

### Technology: React & Popmotion Pose
Instead of React Motion, we used Popmotion Pose as this is a library we're working with more regularily at YM. The app itself was bootstrapped with create-react-app.

### Building Blocks: 99 Problems
To make the interaction work as above, we have to solve a handful of problems.

* On drag of any box, its y-Position must equal mouseY
* On drag, box must scale (1.2) and get a box-shadow
* We must detect were we are dropping the dragged box
* We must reshuffle all boxes to accomodate new positions
* All items have to animate to their new positions
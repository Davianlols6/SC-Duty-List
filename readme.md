# SC Duty List Web Page

The SC (Student Councillor for short) Duty List Web Page is for Student Councillors to use to easily check for their duty spots. 

The website is meant for private use but I am making it public in good faith that it will help others who are looking for examples for these kinds of projects.

If you need anything, I am contactable through the following email davian@davianeng.com.

# The Design Process
### 1) Define the Problem
The way the duty list is presented to the Student Councillors is through a screenshot of a messy and complicated spreadsheet.

The messy and complicated spreadsheet makes for a time consuming experience trying to find out information about your duty.

Also, when the duty list gets updated, a new screenshot would be sent to the Student Councillors. This is annoying as you would have to keep on favoriting a new screenshot just to be able to view the duty list easily.

![An example of the duty list](https://www.davianeng.com/images/518fba3f-5023-4804-8611-e7707614d1ec.jpg)

### 2) Brainstorm and Analyze Ideas
One solution to this is to make the duty list look much more cleaner in it's spreadsheet. However this solution does not address the "squinting your eyes trying to find your name" problem.

Another solution which addresses almost all of the problems is to make a website where you can view the duty list. 

However, this has some cons of which one is that those with no access to the internet would not be able to view the duty list. But this con is not really that big of a concern as those without access to the internet can just borrow a friend's phone to view the duty list.

### 3) Develop the Solution
I decided on using CSV, Python, HTML, Javascript, Jquery and JSON to make this website.

It all starts with the CSV files which contains all the information about the duty timings, duty spots, all participants etc. The reason why CSV was chosen was because it is easily for a human to make the necessary edits to it regardless of any experience in coding.

The CSV files are then processed through custom made python files which will then output 3 different json files.

Using json files, the necessary data can be stored on there and json files also ensure that the data can be easily displayed on the website.

### 4) Deploying the Web Page
The website link was sent to the Student Councillors on 12 July 2021. Since the deployment of the web page, it has seen consistent usage from Student Councillors.

### 5) Improving on the Solution
Mass feedback is yet to be collated. However, some feedback from close friends has helped to make the website better.

## License ⚖️
This code is distributed under the MIT license. For more info, read the [LICENSE](https://github.com/Davianlols6/SC-Duty-List/blob/main/LICENSE) file distributed with the source code.

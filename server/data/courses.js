const courses = [
  {
    _id: 'web-dev-001',
    title: 'Complete Web Development Bootcamp',
    description: 'Become a full-stack web developer with just one course. HTML, CSS, Javascript, Node, React, MongoDB and more!',
    instructor: 'Dr. Angela Yu',
    category: 'Web Development',
    level: 'Beginner',
    thumbnailUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    duration: 50,
    rating: 4.8,
    numReviews: 120,
    price: 49,
    videoUrl: 'https://www.youtube.com/watch?v=UB1O30fR-EE',
    syllabus: [
      { title: 'Introduction to HTML', duration: '1:00', videoUrl: 'https://www.youtube.com/watch?v=UB1O30fR-EE' },
      { title: 'CSS Styling', duration: '2:30', videoUrl: 'https://www.youtube.com/watch?v=yfoY53QXEnI' },
      { title: 'Javascript Basics', duration: '4:00', videoUrl: 'https://www.youtube.com/watch?v=W6NZfCO5SIk' },
      { title: 'React Framework', duration: '6:00', videoUrl: 'https://www.youtube.com/watch?v=bMknfKXIFA8' },
      { title: 'Node.js Backend', duration: '5:00', videoUrl: 'https://www.youtube.com/watch?v=TlB_eWDSMt4' }
    ],
    gameLevels: [
      {
        level: 1,
        title: 'HTML Basics',
        description: 'Learn the fundamental build blocks of the web.',
        mechanicType: 'catcher',
        xpRequired: 0,
        catcherConfig: {
          validItems: ['<div>', '<h1>', '<p>', '<a>', '<img>', '<span>', '<ul>', '<li>', '<section>'],
          noiseItems: ['[block]', '{box}', '<header1>', '(div)', 'item', 'tag', 'data'],
          tutorialTitle: 'Tag Catcher!',
          tutorialValidLabel: 'valid HTML tags',
          tutorialNoiseLabel: 'fake noise tags'
        },
        badge: { name: 'HTML Novice', icon: '🥉', description: 'Mastered core HTML tags' },
        challenges: [
          {
            type: 'quiz',
            question: 'What does HTML stand for?',
            options: ['Hyper Text Markup Language', 'High Tech Modern Language', 'Home Tool Markup Language', 'Hyperlinks and Text Markup Language'],
            correctAnswer: 'Hyper Text Markup Language',
            xpReward: 10,
            timeLimit: 30
          },
          {
            type: 'quiz',
            question: 'Which tag is for the largest heading?',
            options: ['<h6>', '<h1>', '<p>', '<head>'],
            correctAnswer: '<h1>',
            xpReward: 10,
            timeLimit: 20
          }
        ]
      },
      {
        level: 2,
        title: 'CSS Styling',
        description: 'Style your web pages with colors, fonts, and layouts.',
        mechanicType: 'stylelab',
        xpRequired: 20,
        badge: { name: 'CSS Apprentice', icon: '🥈', description: 'Styled your first pages' },
        challenges: [
          {
            type: 'quiz',
            question: 'How do you select an element with id "header"?',
            options: ['.header', '#header', '*header', 'header'],
            correctAnswer: '#header',
            xpReward: 20,
            timeLimit: 25
          },
          {
            type: 'quiz',
            question: 'Which property changes background color?',
            options: ['color', 'background-color', 'bg-color', 'style'],
            correctAnswer: 'background-color',
            xpReward: 20,
            timeLimit: 25
          }
        ]
      },
      {
        level: 3,
        title: 'Javascript Basics',
        description: 'Bring your web pages to life with logic and interactivity.',
        mechanicType: 'bugblaster',
        xpRequired: 100,
        badge: { name: 'JS Ninja', icon: '🥇', description: 'Mastered core JS logic' },
        challenges: [
          {
            type: 'code',
            question: 'Complete the return statement for addition:',
            code: 'function add(a, b) {\n  return ___;\n}',
            correctAnswer: 'a + b',
            xpReward: 30,
            timeLimit: 40
          }
        ]
      },
      {
        level: 4,
        title: 'Master Challenge (Boss)',
        description: 'The ultimate test of your web development skills.',
        mechanicType: 'bosstower',
        xpRequired: 90,
        badge: { name: 'Web Dev King', icon: '👑', description: 'Beated the final boss!' },
        challenges: [
          {
            type: 'quiz',
            question: 'Which tool handles both frontend and backend state?',
            options: ['React', 'Redux', 'Full-stack Knowledge', 'Next.js'],
            correctAnswer: 'Full-stack Knowledge',
            xpReward: 50,
            timeLimit: 15
          }
        ]
      }
    ],
    games: [
      {
        title: 'HTML Fundamentals Quiz',
        type: 'quiz',
        difficulty: 'easy',
        description: 'Test your knowledge of HTML basics',
        questions: [
          {
            question: 'What does HTML stand for?',
            options: ['Hyper Text Markup Language', 'High Tech Modern Language', 'Home Tool Markup Language', 'Hyperlinks and Text Markup Language'],
            correctAnswer: 'Hyper Text Markup Language',
            explanation: 'HTML stands for Hyper Text Markup Language, which is the standard markup language for creating web pages.'
          },
          {
            question: 'Which HTML tag is used for the largest heading?',
            options: ['<h6>', '<h1>', '<heading>', '<head>'],
            correctAnswer: '<h1>',
            explanation: '<h1> is used for the largest heading, while <h6> is the smallest.'
          },
          {
            question: 'What is the correct HTML element for inserting a line break?',
            options: ['<break>', '<br>', '<lb>', '<newline>'],
            correctAnswer: '<br>',
            explanation: 'The <br> tag is used to insert a single line break in HTML.'
          },
          {
            question: 'Which attribute is used to provide alternative text for an image?',
            options: ['title', 'alt', 'src', 'text'],
            correctAnswer: 'alt',
            explanation: 'The alt attribute provides alternative text for an image if it cannot be displayed.'
          },
          {
            question: 'What is the correct HTML for creating a hyperlink?',
            options: ['<a url="http://example.com">Link</a>', '<a href="http://example.com">Link</a>', '<link>http://example.com</link>', '<hyperlink>http://example.com</hyperlink>'],
            correctAnswer: '<a href="http://example.com">Link</a>',
            explanation: 'The <a> tag with href attribute is used to create hyperlinks in HTML.'
          }
        ]
      },
      {
        title: 'CSS Selector Challenge',
        type: 'quiz',
        difficulty: 'medium',
        description: 'Master CSS selectors and styling',
        questions: [
          {
            question: 'Which CSS property is used to change the text color?',
            options: ['text-color', 'color', 'font-color', 'text-style'],
            correctAnswer: 'color',
            explanation: 'The color property is used to set the color of text in CSS.'
          },
          {
            question: 'How do you select an element with id "header"?',
            options: ['.header', '#header', '*header', 'header'],
            correctAnswer: '#header',
            explanation: 'The # symbol is used to select elements by their id in CSS.'
          },
          {
            question: 'Which property is used to change the background color?',
            options: ['bgcolor', 'background-color', 'color-background', 'bg-color'],
            correctAnswer: 'background-color',
            explanation: 'The background-color property sets the background color of an element.'
          },
          {
            question: 'How do you make text bold in CSS?',
            options: ['font-weight: bold', 'text-style: bold', 'font: bold', 'text-weight: bold'],
            correctAnswer: 'font-weight: bold',
            explanation: 'The font-weight property with value bold makes text bold.'
          }
        ]
      },
      {
        title: 'JavaScript Code Challenge',
        type: 'code-challenge',
        difficulty: 'medium',
        description: 'Complete the JavaScript function',
        questions: [
          {
            question: 'Complete the function to add two numbers:',
            code: 'function add(a, b) {\n  return ___;\n}',
            correctAnswer: 'a + b',
            explanation: 'Simply return the sum of a and b using the + operator.'
          },
          {
            question: 'Complete the function to check if a number is even:',
            code: 'function isEven(num) {\n  return num ___ === 0;\n}',
            correctAnswer: '% 2',
            explanation: 'Use the modulo operator (%) to check if the remainder when divided by 2 is 0.'
          }
        ]
      },
      {
        title: 'Web Dev Concepts Matching',
        type: 'matching',
        difficulty: 'easy',
        description: 'Match HTML, CSS, and JavaScript concepts',
        questions: [
          {
            pairs: [
              { term: 'DOM', definition: 'Document Object Model - represents the page structure' },
              { term: 'Responsive Design', definition: 'Layout that adapts to different screen sizes' },
              { term: 'API', definition: 'Application Programming Interface for data exchange' },
              { term: 'React', definition: 'JavaScript library for building user interfaces' },
              { term: 'Event Listener', definition: 'Code that runs when a user action occurs' }
            ]
          }
        ]
      }
    ]
  },
  {
    _id: 'python-001',
    title: 'Python for Data Science and Machine Learning',
    description: 'Learn how to use NumPy, Pandas, Seaborn , Matplotlib , Plotly , Scikit-Learn , Machine Learning, Tensorflow , and more!',
    instructor: 'Jose Portilla',
    category: 'Data Science',
    level: 'Intermediate',
    thumbnailUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    duration: 40,
    rating: 4.7,
    numReviews: 85,
    price: 59,
    videoUrl: 'https://www.youtube.com/watch?v=_uQrJ0TkZlc',
    syllabus: [
      { title: 'Python Crash Course', duration: '2:00', videoUrl: 'https://www.youtube.com/watch?v=_uQrJ0TkZlc' },
      { title: 'NumPy & Pandas', duration: '3:30', videoUrl: 'https://www.youtube.com/watch?v=vmEHCJofslg' },
      { title: 'Data Visualization', duration: '4:00', videoUrl: 'https://www.youtube.com/watch?v=3Xc3CA655Y4' },
      { title: 'Machine Learning Basics', duration: '5:00', videoUrl: 'https://www.youtube.com/watch?v=7eh4d6sabA0' }
    ],
    gameLevels: [
      {
        level: 1,
        title: 'Python Crash Course',
        description: 'Master the basics of Python syntax and structures.',
        mechanicType: 'catcher',
        xpRequired: 0,
        catcherConfig: {
          validItems: ['print()', 'def', 'import', 'for', 'if', 'return', 'len()', 'range()', 'list', 'dict'],
          noiseItems: ['prnt()', 'fuction', 'imprt', '4', 'rtrn', 'lenn()', 'list[]', 'dict{}', 'retrun'],
          tutorialTitle: 'Python Catcher!',
          tutorialValidLabel: 'valid Python keywords & functions',
          tutorialNoiseLabel: 'typos & invalid syntax'
        },
        badge: { name: 'Python Scripter', icon: '🐍', description: 'Wrote your first Python scripts' },
        challenges: [
          {
            type: 'quiz',
            question: 'Which keyword defines a function?',
            options: ['function', 'def', 'func', 'define'],
            correctAnswer: 'def',
            xpReward: 10,
            timeLimit: 20
          }
        ]
      },
      {
        level: 2,
        title: 'NumPy & Pandas',
        description: 'Work with arrays and dataframes like a pro.',
        mechanicType: 'stylelab',
        xpRequired: 10,
        badge: { name: 'Data Wrangler', icon: '📊', description: 'Manipulated your first datasets' },
        challenges: [
          {
            type: 'quiz',
            question: 'What is a DataFrame?',
            options: ['A list', 'A 2D labeled data structure', 'A function', 'A plot'],
            correctAnswer: 'A 2D labeled data structure',
            xpReward: 20,
            timeLimit: 25
          }
        ]
      },
      {
        level: 3,
        title: 'Machine Learning',
        description: 'Build and train your first predictive models.',
        mechanicType: 'bugblaster',
        xpRequired: 30,
        badge: { name: 'ML Engineer', icon: '🤖', description: 'Trained a machine learning model' },
        challenges: [
          {
            type: 'quiz',
            question: 'What is supervised learning?',
            options: ['Learning without data', 'Learning with labeled data', 'Learning from errors', 'Learning by playing'],
            correctAnswer: 'Learning with labeled data',
            xpReward: 30,
            timeLimit: 30
          }
        ]
      },
      {
        level: 4,
        title: 'The Neural Boss',
        description: 'Conquer the complexities of Deep Learning.',
        mechanicType: 'bosstower',
        xpRequired: 60,
        badge: { name: 'AI Master', icon: '🧠', description: 'Created an artificial brain' },
        challenges: [
          {
            type: 'quiz',
            question: 'What is a neural network activation function?',
            options: ['Network starter', 'Non-linearity introducer', 'Error solver', 'Data saver'],
            correctAnswer: 'Non-linearity introducer',
            xpReward: 50,
            timeLimit: 15
          }
        ]
      }
    ],
    games: [
      {
        title: 'Python Basics Quiz',
        type: 'quiz',
        difficulty: 'easy',
        description: 'Test your Python fundamentals',
        questions: [
          {
            question: 'What is the correct way to create a list in Python?',
            options: ['list = (1, 2, 3)', 'list = [1, 2, 3]', 'list = {1, 2, 3}', 'list = <1, 2, 3>'],
            correctAnswer: 'list = [1, 2, 3]',
            explanation: 'Square brackets [] are used to create lists in Python.'
          },
          {
            question: 'Which keyword is used to define a function in Python?',
            options: ['function', 'def', 'func', 'define'],
            correctAnswer: 'def',
            explanation: 'The def keyword is used to define functions in Python.'
          },
          {
            question: 'What does the len() function do?',
            options: ['Returns the length of an object', 'Lengthens a string', 'Creates a new list', 'Deletes an element'],
            correctAnswer: 'Returns the length of an object',
            explanation: 'len() returns the number of items in an object like a list, string, or dictionary.'
          },
          {
            question: 'How do you start a comment in Python?',
            options: ['//', '/*', '#', '--'],
            correctAnswer: '#',
            explanation: 'The # symbol is used to start a single-line comment in Python.'
          }
        ]
      },
      {
        title: 'Data Science Concepts Matching',
        type: 'matching',
        difficulty: 'medium',
        description: 'Match data science terms with their definitions',
        questions: [
          {
            pairs: [
              { term: 'NumPy', definition: 'Library for numerical computing with arrays' },
              { term: 'Pandas', definition: 'Data manipulation and analysis library' },
              { term: 'Matplotlib', definition: 'Plotting and visualization library' },
              { term: 'Scikit-learn', definition: 'Machine learning library' },
              { term: 'DataFrame', definition: 'Two-dimensional labeled data structure' }
            ]
          }
        ]
      },
      {
        title: 'Data Visualization Quiz',
        type: 'quiz',
        difficulty: 'medium',
        description: 'Test your knowledge of charts and visualization',
        questions: [
          {
            question: 'Which chart is best for showing trends over time?',
            options: ['Pie chart', 'Line chart', 'Bar chart', 'Scatter plot'],
            correctAnswer: 'Line chart',
            explanation: 'Line charts are ideal for showing how values change over time.'
          },
          {
            question: 'What does a box plot display?',
            options: ['Averages only', 'Distribution and quartiles', 'Correlations', 'Categories'],
            correctAnswer: 'Distribution and quartiles',
            explanation: 'Box plots show the median, quartiles, and potential outliers in a dataset.'
          },
          {
            question: 'When would you use a heatmap?',
            options: ['Comparing two categories', 'Showing correlation between variables', 'Listing items', 'Displaying text'],
            correctAnswer: 'Showing correlation between variables',
            explanation: 'Heatmaps are great for visualizing correlations or patterns in matrix data.'
          }
        ]
      }
    ]
  },
  {
    _id: 'cyber-001',
    title: 'The Complete Cyber Security Course',
    description: 'Volume 1 : Hackers Exposed. Explains the security weaknesses in systems and how to fix them.',
    instructor: 'Nathan House',
    category: 'Cyber Security',
    level: 'Advanced',
    thumbnailUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    duration: 35,
    rating: 4.9,
    numReviews: 200,
    price: 39,
    videoUrl: 'https://www.youtube.com/watch?v=inWWhr5tnEA',
    syllabus: [
      { title: 'Intro to Cyber Security', duration: '1:30', videoUrl: 'https://www.youtube.com/watch?v=inWWhr5tnEA' },
      { title: 'Network Security', duration: '4:00', videoUrl: 'https://www.youtube.com/watch?v=Y45SE3RVMHc' },
      { title: 'Malware Threats', duration: '3:00', videoUrl: 'https://www.youtube.com/watch?v=yxYEV6aC5SU' },
      { title: 'Anonymous Browsing', duration: '2:00', videoUrl: 'https://www.youtube.com/watch?v=7Vixer0C1Nk' }
    ],
    gameLevels: [
      {
        level: 1,
        title: 'Security Foundations',
        description: 'Learn the basic principles of staying safe online.',
        mechanicType: 'catcher',
        xpRequired: 0,
        catcherConfig: {
          validItems: ['VPN', '2FA', 'HTTPS', 'Firewall', 'Encrypt', 'Backup', 'Password', 'Tor', 'Token'],
          noiseItems: ['VP', '2F', 'HTTP', 'Fireall', 'Encript', 'Back', 'pass', 'Torr', 'Tiken'],
          tutorialTitle: 'Security Catcher!',
          tutorialValidLabel: 'valid security terms',
          tutorialNoiseLabel: 'fake or risky terms'
        },
        badge: { name: 'Shield Bearer', icon: '🛡️', description: 'Learned security basics' },
        challenges: [
          {
            type: 'quiz',
            question: 'What does VPN stand for?',
            options: ['Virtual Private Network', 'Very Private Network', 'Verified Personal Network', 'Virtual Public Network'],
            correctAnswer: 'Virtual Private Network',
            xpReward: 10,
            timeLimit: 20
          }
        ]
      },
      {
        level: 2,
        title: 'Threat Detection',
        description: 'Identify common cyber threats and phishing attempts.',
        mechanicType: 'stylelab',
        xpRequired: 10,
        badge: { name: 'Threat Hunter', icon: '🕵️', description: 'Identified a phishing attack' },
        challenges: [
          {
            type: 'quiz',
            question: 'You receive a suspicious email. What do you do?',
            options: ['Click the link', 'Delete and contact bank', 'Reply to it', 'Ignore it'],
            correctAnswer: 'Delete and contact bank',
            xpReward: 20,
            timeLimit: 20
          }
        ]
      },
      {
        level: 3,
        title: 'Advanced Defense',
        description: 'Encryption, anonymity, and network security.',
        xpRequired: 30,
        badge: { name: 'Cyber Guardian', icon: '⚔️', description: 'Secured a network' },
        challenges: [
          {
            type: 'quiz',
            question: 'What is two-factor authentication?',
            options: ['Two passwords', 'Password + another method', 'Logging twice', 'Safety check'],
            correctAnswer: 'Password + another method',
            xpReward: 30,
            timeLimit: 25
          }
        ]
      },
      {
        level: 4,
        title: 'The Rogue Hacker (Boss)',
        description: 'Stop a sophisticated cyber attack in real-time.',
        mechanicType: 'bosstower',
        xpRequired: 60,
        badge: { name: 'Cyber Hero', icon: '🎖️', description: 'Stopped the main hack' },
        challenges: [
          {
            type: 'quiz',
            question: 'Which tool is best for anonymous browsing?',
            options: ['VPN', 'Tor', 'Incognito', 'Proxy'],
            correctAnswer: 'Tor',
            xpReward: 50,
            timeLimit: 15
          }
        ]
      }
    ],
    games: [
      {
        title: 'Security Scenario Challenge',
        type: 'scenario',
        difficulty: 'hard',
        description: 'Make the right security decisions',
        questions: [
          {
            question: 'You receive an email from your "bank" asking you to verify your account by clicking a link. What should you do?',
            options: [
              'Click the link immediately to verify',
              'Delete the email and contact your bank directly',
              'Reply with your account details',
              'Forward it to friends to warn them'
            ],
            correctAnswer: 'Delete the email and contact your bank directly',
            explanation: 'This is a phishing attempt. Never click links in unsolicited emails. Always contact your bank directly using official contact information.'
          },
          {
            question: 'You find a USB drive in the parking lot. What should you do?',
            options: [
              'Plug it into your work computer to find the owner',
              'Take it to IT/security department',
              'Plug it into a personal computer',
              'Throw it away'
            ],
            correctAnswer: 'Take it to IT/security department',
            explanation: 'Unknown USB drives can contain malware. Never plug them into any computer. Report it to IT or security.'
          },
          {
            question: 'Your password is "password123". Is this secure?',
            options: [
              'Yes, it has numbers',
              'No, it is too common and weak',
              'Yes, it is easy to remember',
              'No, but it is fine for unimportant accounts'
            ],
            correctAnswer: 'No, it is too common and weak',
            explanation: 'This is one of the most common passwords and can be cracked instantly. Use long, complex, unique passwords for each account.'
          }
        ]
      },
      {
        title: 'Cyber Security Quiz',
        type: 'quiz',
        difficulty: 'medium',
        description: 'Test your security knowledge',
        questions: [
          {
            question: 'What does VPN stand for?',
            options: ['Virtual Private Network', 'Very Private Network', 'Verified Personal Network', 'Virtual Public Network'],
            correctAnswer: 'Virtual Private Network',
            explanation: 'VPN stands for Virtual Private Network, which encrypts your internet connection.'
          },
          {
            question: 'What is two-factor authentication?',
            options: [
              'Using two passwords',
              'Logging in twice',
              'Using password plus another verification method',
              'Having two user accounts'
            ],
            correctAnswer: 'Using password plus another verification method',
            explanation: '2FA adds an extra layer of security by requiring a second form of verification beyond just a password.'
          }
        ]
      },
      {
        title: 'Security Terms Matching',
        type: 'matching',
        difficulty: 'easy',
        description: 'Match cyber security terms with their definitions',
        questions: [
          {
            pairs: [
              { term: 'Phishing', definition: 'Fraudulent attempt to obtain sensitive info via email' },
              { term: 'Malware', definition: 'Malicious software designed to harm systems' },
              { term: 'Encryption', definition: 'Converting data into a secure coded format' },
              { term: 'Firewall', definition: 'Network security system that monitors traffic' },
              { term: 'Ransomware', definition: 'Malware that encrypts files and demands payment' }
            ]
          }
        ]
      }
    ]
  },
  {
    _id: 'soft-skills-001',
    title: 'Mastering Soft Skills for Success',
    description: 'Learn communication, leadership, and emotional intelligence skills to boost your career.',
    instructor: 'Simon Sinek',
    category: 'Soft Skills',
    level: 'Beginner',
    thumbnailUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    duration: 12,
    rating: 4.6,
    numReviews: 50,
    price: 29,
    videoUrl: 'https://www.youtube.com/watch?v=2zqKc5QdQgs',
    syllabus: [
      { title: 'Effective Communication', duration: '2:00', videoUrl: 'https://www.youtube.com/watch?v=HAnw168huqA' },
      { title: 'Leadership Principles', duration: '2:30', videoUrl: 'https://www.youtube.com/watch?v=1R6BML0J7Ew' },
      { title: 'Time Management', duration: '1:30', videoUrl: 'https://www.youtube.com/watch?v=gu8K2xGZLZQ' }
    ],
    gameLevels: [
      {
        level: 1,
        title: 'Emotional Intelligence',
        description: 'Understand and manage your emotions and those of others.',
        mechanicType: 'catcher',
        xpRequired: 0,
        catcherConfig: {
          validItems: ['Listen', 'Empathy', 'Feedback', 'Delegate', 'Prioritize', 'Collaborate', 'Respect', 'Communicate'],
          noiseItems: ['Listn', 'Emthy', 'Feedbak', 'Dlegate', 'Prioritze', 'Colaborate', 'Respectt', 'Commnicate'],
          tutorialTitle: 'Soft Skills Catcher!',
          tutorialValidLabel: 'valid soft skills',
          tutorialNoiseLabel: 'misspelled words'
        },
        badge: { name: 'Empathetic Soul', icon: '❤️', description: 'Showed high emotional intelligence' },
        challenges: [
          {
            type: 'quiz',
            question: 'What is empathy?',
            options: ['Feeling sorry for someone', 'Understanding others feelings', 'Ignoring emotions', 'Being nice'],
            correctAnswer: 'Understanding others feelings',
            xpReward: 10,
            timeLimit: 20
          }
        ]
      },
      {
        level: 2,
        title: 'Leadership Skills',
        description: 'Inspire and guide your team to success.',
        mechanicType: 'stylelab',
        xpRequired: 10,
        badge: { name: 'Natural Leader', icon: '🌟', description: 'Led a team successfully' },
        challenges: [
          {
            type: 'quiz',
            question: 'What is the most important leadership trait?',
            options: ['Authority', 'Empathy/Listening', 'Speaking loudly', 'Being the boss'],
            correctAnswer: 'Empathy/Listening',
            xpReward: 20,
            timeLimit: 25
          }
        ]
      },
      {
        level: 3,
        title: 'Time Management',
        description: 'Master the art of prioritizing and managing your time effectively.',
        mechanicType: 'bugblaster',
        xpRequired: 50,
        badge: { name: 'Time Master', icon: '⌛', description: 'Optimized your schedule' },
        challenges: [
          {
            type: 'quiz',
            question: 'What is the Eisenhower Matrix used for?',
            options: ['Coding', 'Prioritizing tasks by urgency and importance', 'Team building', 'Budget planning'],
            correctAnswer: 'Prioritizing tasks by urgency and importance',
            xpReward: 30,
            timeLimit: 30
          }
        ]
      },
      {
        level: 4,
        title: 'Boss Level: Productivity Master',
        description: 'Balance all your skills in a high-pressure environment.',
        mechanicType: 'bosstower',
        xpRequired: 100,
        badge: { name: 'Zen Architect', icon: '🧘', description: 'Mastered the work-life balance' },
        challenges: [
          {
            type: 'quiz',
            question: 'What is the ultimate productivity goal?',
            options: ['Working more', 'Working smarter', 'Working less', 'No work'],
            correctAnswer: 'Working smarter',
            xpReward: 50,
            timeLimit: 15
          }
        ]
      }
    ],
    games: [
      {
        title: 'Leadership Scenario Challenge',
        type: 'scenario',
        difficulty: 'medium',
        description: 'Practice leadership decisions in real-world situations',
        questions: [
          {
            question: 'Your team is behind schedule on a project. How do you handle it?',
            options: [
              'Blame the team in a meeting',
              'Assess the situation, reprioritize tasks, and support your team',
              'Work alone to finish everything',
              'Ask for an extension without discussing with the team'
            ],
            correctAnswer: 'Assess the situation, reprioritize tasks, and support your team',
            explanation: 'Effective leaders take responsibility, analyze problems, and empower their team to find solutions together.'
          },
          {
            question: 'A team member is struggling with a task. What is the best approach?',
            options: [
              'Take over and do it yourself',
              'Offer guidance and resources, then check in periodically',
              'Ignore it and hope they figure it out',
              'Assign the task to someone else'
            ],
            correctAnswer: 'Offer guidance and resources, then check in periodically',
            explanation: 'Good leaders develop their team by coaching, not by taking over. Provide support while allowing growth.'
          },
          {
            question: 'You need to delegate an important task. Who do you choose?',
            options: [
              'The person who is least busy',
              'The person with the right skills who would benefit from the challenge',
              'Do it yourself to ensure it is done correctly',
              'Randomly assign to anyone'
            ],
            correctAnswer: 'The person with the right skills who would benefit from the challenge',
            explanation: 'Effective delegation matches tasks to skills and growth opportunities, building capability in your team.'
          }
        ]
      },
      {
        title: 'Communication Skills Scenario',
        type: 'scenario',
        difficulty: 'medium',
        description: 'Navigate workplace communication challenges',
        questions: [
          {
            question: 'A colleague takes credit for your idea in a meeting. How do you respond?',
            options: [
              'Confront them angrily in front of everyone',
              'Speak with them privately after the meeting',
              'Let it go and say nothing',
              'Complain to other coworkers'
            ],
            correctAnswer: 'Speak with them privately after the meeting',
            explanation: 'Professional communication involves addressing issues directly but privately, giving the benefit of the doubt first.'
          },
          {
            question: 'You need to give negative feedback to a team member. What is the best approach?',
            options: [
              'Send an email to avoid confrontation',
              'Discuss it in a team meeting',
              'Have a private, constructive conversation',
              'Ask someone else to tell them'
            ],
            correctAnswer: 'Have a private, constructive conversation',
            explanation: 'Effective feedback is given privately, focusing on specific behaviors and offering support for improvement.'
          },
          {
            question: 'During a presentation, someone asks a question you don\'t know the answer to. What do you do?',
            options: [
              'Make up an answer',
              'Admit you don\'t know and offer to follow up',
              'Ignore the question',
              'Deflect to someone else'
            ],
            correctAnswer: 'Admit you don\'t know and offer to follow up',
            explanation: 'Honesty builds trust. It\'s better to admit you don\'t know and commit to finding the answer than to provide false information.'
          }
        ]
      },
      {
        title: 'Soft Skills Terms Matching',
        type: 'matching',
        difficulty: 'easy',
        description: 'Match soft skills concepts with their definitions',
        questions: [
          {
            pairs: [
              { term: 'Emotional Intelligence', definition: 'Ability to recognize and manage emotions in yourself and others' },
              { term: 'Active Listening', definition: 'Fully concentrating on what is being said rather than just hearing' },
              { term: 'Time Management', definition: 'Planning and controlling how much time to spend on activities' },
              { term: 'Constructive Feedback', definition: 'Feedback focused on improvement delivered in a helpful way' },
              { term: 'Delegation', definition: 'Assigning responsibility to others while maintaining accountability' }
            ]
          }
        ]
      }
    ]
  },
  {
    _id: 'ai-001',
    title: 'AI & Machine Learning A-Z',
    description: 'Learn to create Machine Learning Algorithms in Python and R from two Data Science experts.',
    instructor: 'Kirill Eremenko',
    category: 'Artificial Intelligence',
    level: 'Intermediate',
    thumbnailUrl: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    duration: 45,
    rating: 4.5,
    numReviews: 300,
    price: 69,
    videoUrl: 'https://www.youtube.com/watch?v=GwIo3gDZCVQ',
    syllabus: [
      { title: 'Data Preprocessing', duration: '1:00', videoUrl: 'https://www.youtube.com/watch?v=UsfB3V0E8Dw' },
      { title: 'Regression', duration: '3:00', videoUrl: 'https://www.youtube.com/watch?v=E5RjzSK0fvY' },
      { title: 'Classification', duration: '3:00', videoUrl: 'https://www.youtube.com/watch?v=G6W8F3mz3tA' },
      { title: 'Clustering', duration: '2:00', videoUrl: 'https://www.youtube.com/watch?v=4b5d3muPQmA' }
    ],
    gameLevels: [
      {
        level: 1,
        title: 'AI Fundamentals',
        description: 'The core concepts of Artificial Intelligence.',
        mechanicType: 'catcher',
        xpRequired: 0,
        catcherConfig: {
          validItems: ['model', 'train', 'predict', 'neural', 'epoch', 'accuracy', 'tensor', 'dataset', 'layer'],
          noiseItems: ['modle', 'tarin', 'predic', 'nerual', 'epoc', 'accurcy', 'tensr', 'datast', 'layr'],
          tutorialTitle: 'AI Catcher!',
          tutorialValidLabel: 'valid AI/ML terms',
          tutorialNoiseLabel: 'typos & invalid terms'
        },
        badge: { name: 'AI Apprentice', icon: '👾', description: 'Understood AI basics' },
        challenges: [
          {
            type: 'quiz',
            question: 'What is the Turing Test?',
            options: ['Math test', 'Intelligence test', 'Speed test', 'Game test'],
            correctAnswer: 'Intelligence test',
            xpReward: 10,
            timeLimit: 20
          }
        ]
      },
      {
        level: 2,
        title: 'Data Visualisation',
        description: 'Understand the data before you train your model.',
        mechanicType: 'stylelab',
        xpRequired: 20,
        badge: { name: 'Data Artist', icon: '📊', description: 'Visualized complex datasets' },
        challenges: [
          {
            type: 'quiz',
            question: 'Which plot is best for distribution?',
            options: ['Histogram', 'Scatter', 'Pie', 'Line'],
            correctAnswer: 'Histogram',
            xpReward: 20,
            timeLimit: 20
          }
        ]
      },
      {
        level: 3,
        title: 'Machine Learning',
        description: 'Build and train your first predictive models.',
        mechanicType: 'bugblaster',
        xpRequired: 50,
        badge: { name: 'ML Engineer', icon: '🤖', description: 'Trained a machine learning model' },
        challenges: [
          {
            type: 'quiz',
            question: 'What is overfitting?',
            options: ['Too many parameters', 'Too few data', 'Model is too simple', 'Model is too complex'],
            correctAnswer: 'Model is too complex',
            xpReward: 30,
            timeLimit: 30
          }
        ]
      },
      {
        level: 4,
        title: 'Boss Level: AI Architect',
        description: 'Deploy a complex AI model to solve a real-world problem.',
        mechanicType: 'bosstower',
        xpRequired: 100,
        badge: { name: 'AI Grandmaster', icon: '🏅', description: 'Conquered the machine learning journey' },
        challenges: [
          {
            type: 'quiz',
            question: 'What is the goal of a neural network?',
            options: ['Pattern matching', 'Speed', 'Storage', 'Display'],
            correctAnswer: 'Pattern matching',
            xpReward: 50,
            timeLimit: 15
          }
        ]
      }
    ],
    games: [
      {
        title: 'AI & ML Concepts Quiz',
        type: 'quiz',
        difficulty: 'hard',
        description: 'Test your machine learning knowledge',
        questions: [
          {
            question: 'What is the difference between supervised and unsupervised learning?',
            options: [
              'Supervised uses labeled data, unsupervised does not',
              'Supervised is faster than unsupervised',
              'Unsupervised is more accurate',
              'There is no difference'
            ],
            correctAnswer: 'Supervised uses labeled data, unsupervised does not',
            explanation: 'Supervised learning uses labeled training data, while unsupervised learning finds patterns in unlabeled data.'
          },
          {
            question: 'What is overfitting in machine learning?',
            options: [
              'When a model is too simple',
              'When a model performs well on training data but poorly on new data',
              'When there is too much data',
              'When the model trains too quickly'
            ],
            correctAnswer: 'When a model performs well on training data but poorly on new data',
            explanation: 'Overfitting occurs when a model learns the training data too well, including noise, and fails to generalize to new data.'
          },
          {
            question: 'What is a neural network activation function?',
            options: [
              'A function that starts the network',
              'A function that introduces non-linearity',
              'A function that stops training',
              'A function that saves the model'
            ],
            correctAnswer: 'A function that introduces non-linearity',
            explanation: 'Activation functions introduce non-linearity into neural networks, allowing them to learn complex patterns.'
          },
          {
            question: 'What does "training a model" mean?',
            options: [
              'Teaching employees to use the model',
              'Adjusting model parameters to minimize error',
              'Running the model on test data',
              'Deploying the model to production'
            ],
            correctAnswer: 'Adjusting model parameters to minimize error',
            explanation: 'Training involves adjusting the model\'s parameters iteratively to minimize the difference between predictions and actual values.'
          }
        ]
      },
      {
        title: 'ML Algorithm Matching',
        type: 'matching',
        difficulty: 'medium',
        description: 'Match algorithms with their use cases',
        questions: [
          {
            pairs: [
              { term: 'Linear Regression', definition: 'Predicting continuous values' },
              { term: 'Decision Trees', definition: 'Classification with interpretable rules' },
              { term: 'K-Means', definition: 'Grouping similar data points' },
              { term: 'Neural Networks', definition: 'Complex pattern recognition' },
              { term: 'Random Forest', definition: 'Ensemble of decision trees' }
            ]
          }
        ]
      },
      {
        title: 'AI Ethics Scenario',
        type: 'scenario',
        difficulty: 'hard',
        description: 'Navigate ethical dilemmas in AI development',
        questions: [
          {
            question: 'Your AI model shows bias against a demographic group. What should you do?',
            options: [
              'Ignore it and deploy anyway',
              'Investigate the training data, retrain with balanced data, and document the fix',
              'Hide the bias from stakeholders',
              'Only test on the majority group'
            ],
            correctAnswer: 'Investigate the training data, retrain with balanced data, and document the fix',
            explanation: 'AI bias must be addressed transparently. Audit data, improve the model, and document changes for accountability.'
          },
          {
            question: 'A client wants to use your facial recognition for surveillance. How do you respond?',
            options: [
              'Build it without questions',
              'Discuss privacy implications and ensure consent and legal compliance',
              'Build it but add a disclaimer',
              'Refuse without discussion'
            ],
            correctAnswer: 'Discuss privacy implications and ensure consent and legal compliance',
            explanation: 'Responsible AI requires considering privacy, consent, and societal impact before deployment.'
          }
        ]
      }
    ]
  }
];

module.exports = courses;

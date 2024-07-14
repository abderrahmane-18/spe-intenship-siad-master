<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
 
       
</head>
<body>
    <h1>Real-time Monitoring and Control System for Jijel Thermal Power Station</h1>
    <p><img src="https://img.shields.io/badge/license-MIT-green" alt="License Badge"></p>
    <h2>Overview</h2>
    <p>This project is a web application developed to automate and centralize the monitoring and control of production equipment at the Jijel Thermal Power Station. The system features dynamic dashboards and role-based access control to ensure secure, user-specific data interaction. Additionally, it enhances decision-making and resource allocation through comprehensive and interactive data visualization tools.</p>
    <h2>Table of Contents</h2>
    <ul>
        <li><a href="#features">Features</a></li>
        <li><a href="#technologies">Technologies</a></li>
        <li><a href="#project-structure">Project Structure</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#usage">Usage</a></li>
        <li><a href="#contributing">Contributing</a></li>
        <li><a href="#license">License</a></li>
    </ul>
    <h2 id="features">Features</h2>
    <ul>
        <li>Real-time monitoring of production equipment</li>
        <li>Automated control systems</li>
        <li>Centralized data dashboard</li>
        <li>Automated reporting and notifications</li>
        <li>Enhanced productivity and quality control</li>
        <li><strong>Dynamic dashboards:</strong> Created dynamic dashboards and role-based access control to ensure secure and user-specific data interaction</li>
        <li><strong>Data visualization tools:</strong> Improved decision-making and resource allocation through comprehensive and interactive data visualization tools</li>
    </ul>
    <h2 id="technologies">Technologies</h2>
    <ul>
        <li><strong>Frontend:</strong> Vue.js 3 (Composition API), Tailwind CSS, Vuex 4, ApexCharts.js</li>
        <li><strong>Backend:</strong> Laravel 11</li>
        <li><strong>Database:</strong> PostgreSQL</li>
        <li><strong>Other:</strong> Vite</li>
    </ul>
    <h2 id="installation">Installation</h2>
    <h3>Prerequisites</h3>
    <ul>
        <li>Node.js and npm</li>
        <li>PHP</li>
        <li>Composer</li>
        <li>PostgreSQL</li>
    </ul>
    <h3>Frontend</h3>
    <ol>
        <li>Navigate to the <code>front-end-spe</code> directory:
            <pre><code>cd front-end-spe</code></pre>
        </li>
        <li>Install dependencies:
            <pre><code>npm install</code></pre>
        </li>
        <li>Start the development server:
            <pre><code>npm run dev</code></pre>
        </li>
    </ol>
    <h3>Backend</h3>
    <ol>
        <li>Navigate to the <code>back-end-spe</code> directory:
            <pre><code>cd back-end-spe</code></pre>
        </li>
        <li>Install dependencies:
            <pre><code>composer install</code></pre>
        </li>
        <li>Set up the environment file:
            <pre><code>cp .env.example .env</code></pre>
        </li>
        <li>Generate the application key:
            <pre><code>php artisan key:generate</code></pre>
        </li>
        <li>Set up the database:
            <pre><code>php artisan migrate --seed</code></pre>
        </li>
        <li>Start the development server:
            <pre><code>php artisan serve</code></pre>
        </li>
    </ol>
    <h2 id="usage">Usage</h2>
    <ol>
        <li>Start the frontend and backend servers as described in the <a href="#installation">Installation</a> section.</li>
        <li>Access the application in your browser at <code>http://localhost:3000</code> for the frontend and <code>http://localhost:8000</code> for the backend.</li>
    </ol>
    <h2 id="contributing">Contributing</h2>
    <ol>
        <li>Fork the repository</li>
        <li>Create a new branch (<code>git checkout -b feature-branch</code>)</li>
        <li>Commit your changes (<code>git commit -m 'Add some feature'</code>)</li>
        <li>Push to the branch (<code>git push origin feature-branch</code>)</li>
        <li>Open a pull request</li>
    </ol>
    <h2 id="license">License</h2>
    <p>This project is licensed under the MIT License. See the <code>LICENSE</code> file for details.</p>
    <h2 id="acknowledgements">Acknowledgements</h2>
    <ul>
        <li>Supervisor: [Supervisor's Name]</li>
        <li>Special thanks to the Jijel Thermal Power Station team for their support.</li>
    </ul>
</body>
</html>

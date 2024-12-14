import { useSelector } from 'react-redux';
// Example course data based on domains
const courses = {
   'JavaScript': [
      { title: 'Advanced JavaScript', description: 'Learn advanced concepts in JavaScript' },
      { title: 'JavaScript for Beginners', description: 'Start with the basics of JavaScript' },
   ],
   'Python': [
      { title: 'Python for Data Science', description: 'Learn Python for data analysis and visualization' },
      { title: 'Machine Learning with Python', description: 'Get started with ML using Python' },
   ],
   'React': [
      { title: 'React.js Fundamentals', description: 'Learn the core concepts of React' },
      { title: 'Building Web Apps with React', description: 'Build real-world applications using React' },
   ],
   'CSS': [
      { title: 'Mastering CSS', description: 'Deep dive into CSS for better design' },
      { title: 'Responsive Web Design with CSS', description: 'Learn how to build responsive websites' },
   ],
};
function RecommendedCourses() {
   const { wrongDomains } = useSelector((state) => state.mockTest);

   const countDomains = (domains) => {
      return domains.reduce((acc, domain) => {
         acc[domain] = (acc[domain] || 0) + 1;
         return acc;
      }, {});
   };


   const domainCounts = countDomains(wrongDomains);

   const recommendedDomains = Object.entries(domainCounts)
      .sort((a, b) => b[1] - a[1]) // Sort by frequency (descending)
      .slice(0, 5); // Limit to the top 5 most frequent domains
   console.log(recommendedDomains);



   return (
      <div className="recommended-courses container mx-auto py-10">
         <h2 className="text-3xl font-semibold mb-6">Recommended Courses</h2>
         <div className="course-cards grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedDomains.map(([domain]) => (
               <div key={domain} className="course-card p-4 border rounded-lg shadow-lg bg-white">
                  <h3 className="text-xl font-bold mb-2">{domain}</h3>
                  <p className="text-gray-500 mb-4">You need more practice in {domain}. Here are some suggested courses:</p>
                  <ul className="space-y-4">
                     {courses[domain]?.map((course, index) => (
                        <li key={index} className="course-item p-4 border rounded-md bg-gray-100">
                           <h4 className="font-semibold">{course.title}</h4>
                           <p className="text-sm text-gray-600">{course.description}</p>
                        </li>
                     ))}
                  </ul>
               </div>
            ))}
         </div>
      </div>
   );
}

export default RecommendedCourses;
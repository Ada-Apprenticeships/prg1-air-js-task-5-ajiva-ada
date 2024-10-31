[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/vIeDz0UH)
[![Open in Codespaces](https://classroom.github.com/assets/launch-codespace-2972f46106e565e64193e422d61a12cf1da4916b45550586e14ef0a7c637dd04.svg)](https://classroom.github.com/open-in-codespaces?assignment_repo_id=16870553)
# Flight Planning  

A new airline wants to start running commercial passenger flights. In order to assess the feasibility of proposed flights they
want a program that can help calculate the likely profitability of running a flight between a UK and an overseas airport. The UK airport
will be either Manchester (MAN) or London Gatwick (LGW).

They have asked you to create an MVP using some sample flight data. 

* A comma separated (CSV) file called ```airports.csv``` has been provided that contains the name and code for each overseas airport, 
the distance from MAN and the distance from LGW.

* A CSV file has also been provided with aeroplane information (```aeroplanes.csv```).

Two more CSV files are included: ```valid_flight_data.csv``` and ```invalid_flight_data.csv```.

## Task 1

* Each line in the ```valid_flight_data.csv``` file is a potential flight with some sample bookings and ticket prices. You program should read in ```airports.csv```, ```aeroplanes.csv``` and ```valid_flight_data.csv``` and output to the screen the details of the flight and the expected profit or loss for each flight. Additional credit will also be given if this output is also written to a .txt file.

## Task 2

* Each line in the ```invalid_flight_data.csv``` is also potential flights with sample bookings and ticket prices. However, each flight here has a data error (please view the file to see). Your program should be able to gracefully deal with each error and should not calculate impossible figures (for example, if more seats are sold on a plane than the plane actually has!)

## Guidance

  1. Your solution should read in the contents of the mentioned CSV files. This will ensure that your solution will continue to work in the future (e.g. for example if additional overseas airports are added).
  2. You are free to decide on the implementation details of this task. If you were to follow a procedural approach, one approach would be to have a number of functions that perform single tasks that work together to provide the desired output.
  3. Ensure appropriate rounding of floats is considered for calculated values.
 

Here is an example showing the calculation from the first flight data from ```valid_flight_data.csv```.

| UK airport   | Overseas airport   | Type of aircraft   |   Number of economy seats booked |   Number of business seats booked |   Number of first class seats booked |   Price of a economy class seat |   Price of a business class seat |   Price of a first class seat |
|:-------------|:-------------------|:-------------------|---------------------------------:|----------------------------------:|-------------------------------------:|--------------------------------:|---------------------------------:|------------------------------:|
| MAN          | JFK                | Large narrow body  |                              150 |                                12 |                                    2 |                             399 |                              999 |                          1899 |




## Sample Calculation: MAN to JFK (Large Narrow Body Aircraft)

**Flight Details:**

As above

**Data from CSV Files:**

| Source File   | Field                        | Value |
|---------------|-------------------------------|-------|
| airports.csv | Distance from MAN to JFK      | 5376 km |
| aircraft.csv | Running cost per seat per 100km | £7     |
| aircraft.csv | Maximum flight range          | 5600 km |
| aircraft.csv | Total seats                   | 204   |

**Calculations:**

**1. Income:**

| Class      | Seats Booked | Price per Seat | Total Income |
|------------|--------------|---------------|-------------|
| Economy    | 150          | £399          | £59,850     |
| Business   | 12           | £999          | £11,988     |
| First Class | 2           | £1899         | £3,798      |
| **Total**  |             |               | **£75,636** |

**2. Cost:**

| Description                            | Calculation                                               | Value         |
|-----------------------------------------|------------------------------------------------------------|--------------|
| Total seats taken                       | 150 (economy) + 12 (business) + 2 (first-class)              | 164         |
| Cost per seat for the entire flight | £7/seat/100km * (5376 km / 100 km)                           | £376.32/seat |
| Total cost                             | £376.32/seat * 164 seats                                  | £61,732.48   |

**3. Profit:**

£75,636 (income) - £61,732.48 (cost) = £13,903.52
The flight from Manchester (MAN) to JFK (John F. Kennedy International) using a Large narrow body aircraft, with the given seat bookings and prices, would result in a **profit of £13,903.52**.


## Looking for more marks?

* Ensure robust error handling. (Checks for invalid airport/aircraft codes, flight range limitations, and overbooking.)
* Code should be refactored with good coding standards.
* Write your own tests (like what you were provided with in tasks 1,2,3,4)


## Rubric

| Marks | Functionality                                                                                                                                                                                                                                                                                                                                                                                                            | Programming Conventions and Robustness                                                                                                                                                                                                                                                                                                                                                                             |
|-------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 5     | Program fully meets all requirements and specifications, handling a wide range of inputs seamlessly and producing accurate outputs. Demonstrates a comprehensive understanding of the problem and its solution. Thorough tests have been implemented to validate the correct operation of virtually all functionality.                                                                          | Code is near-professional in its organisation, clarity, and maintainability. It employs descriptive variable names and consistent indentation, adhering to industry best practices and coding standards. The code is self-documenting, requiring minimal comments due to its inherent readability. This showcases an thorough understanding of programming conventions. Comprehensive error handling has been incorporated to gracefully manage invalid data and potential edge cases. |
| 4     | Program successfully meets most requirements and specifications, with perhaps minor areas for improvement in handling specific inputs or outputs. Demonstrates a strong grasp of the problem and its effective solution. Several tests have been written to verify the correct operation of key functionalities.                                                                                                   | Code is well-structured, readable, and maintainable, utilising mostly clear variable names and consistent indentation. It largely aligns with industry best practices and coding standards, demonstrating a solid grasp of programming conventions. The code is mostly self-documenting, with comments used only where necessary for clarity. Effective error handling is in place for many scenarios, with opportunities to further enhance its comprehensiveness.    |
| 3     | Program achieves some of the requirements and specifications, showcasing a basic understanding of the problem and its solution. There's room for further development in handling inputs, producing outputs, or implementing more comprehensive tests.                                                                                                                                                              | Code displays reasonable organisation and readability, with potential for refinement in variable naming or indentation. It incorporates some industry best practices and coding standards, demonstrating a developing understanding of programming conventions. Comments are used where appropriate, but there might be room for improvement in making the code more self-explanatory. Basic error handling is present, providing a foundation for further strengthening its effectiveness.   |
| 2     | Program partially addresses the requirements and specifications, demonstrating a developing understanding of the problem and its solution. Further refinement is needed to enhance functionality and implement testing.                                                                                                                                                                                                | Code presents opportunities for improvement in organisation and readability, with room to enhance variable naming and indentation. Further alignment with industry best practices and coding standards is recommended. The use of comments could be refined to focus on clarifying complex logic rather than stating the obvious. Error handling could be expanded to address a wider range of potential issues.    |
| 1     | Program shows initial efforts towards meeting the requirements and specifications, indicating a basic understanding of the problem and its solution. Significant enhancements are required to improve functionality and implement testing.                                                                                                                                                                             | Code demonstrates initial efforts towards organisation and readability, indicating a budding understanding of programming conventions. Significant enhancements are encouraged to improve clarity and maintainability, including refining the use of comments and variable names. Incorporating error handling would significantly bolster the code's robustness.                                |
| 0     | Program does not yet meet the requirements and specifications.                                                                                                                                                                                                                                                                                                                                                                             | Code currently lacks adherence to programming conventions and robustness.                                                                                                                                                                                                                                                                                                                                                   |

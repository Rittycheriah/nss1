using System;

namespace caveEx
{
	class MainClass
	{
		public static void Main (string[] args)
		{
			Console.WriteLine ("Please enter a number");
			string userInput = Console.ReadLine ();

			int resultCon;
			bool result = Int32.TryParse(userInput, out resultCon);

			if (result) {
				if (resultCon > 10) {
					Console.WriteLine ("The number is too small");
				} else {
					Console.WriteLine ("The number is just right");				
				}
			} else {
				Console.WriteLine ("TryParse didn't work");
			}
	
		}
	}
}

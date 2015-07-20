using System;
using System.Text;
using System.Linq;
using System.Windows;
using System.IO;
using System.Collections.Generic;

namespace secondHW
{
	class secondHW
	{
		public static void Main(string[] args)
		{
			Console.WriteLine ("What number would you like to choose?");
			int upperLimit = int.Parse(Console.ReadLine());
			List<int> evenNums = new List<int>();

			for (int i = 1; i < upperLimit; i++) 
			{
				if (i % 2 == 0) 
				{
					evenNums.Add(i);
					Console.WriteLine (i);
				}	
			}

			int totalSum = evenNums.Sum ();
			Console.WriteLine ("The total of the even numbers for your choice {0}", totalSum);

		}
	}
}

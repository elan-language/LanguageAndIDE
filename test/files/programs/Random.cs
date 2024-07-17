    //Acknowledgement: Algorithm copied from https://www.codeproject.com/KB/recipes/SimpleRNG.aspx?display=Print 
    //which is based on origonal work by George Marsaglia.

    public class FRandom
    {
        public readonly int Number;
        private readonly uint U;
        private readonly uint V;
        internal FRandom(int result, uint u, uint v)
        {
            Number = result;
            U = u;
            V = v;
        }

        internal FRandom(uint u, uint v)
        {
            U = u;
            V = v;
        }

        /// <summary>
        /// Produces pseudo-random number from two specified non-zero seed values.
        /// If either value is zero, a default will be used instead.
        /// </summary>
        /// <param name="u"></param>
        /// <param name="v"></param>
        /// <returns></returns>
        public static FRandom Seed(uint u, uint v)
        {
            return new FRandom(u != 0 ? u: 521288629, v != 0 ? v : 362436069);
        }

        /// <summary>
        /// Uses the default values for the seed, so returned FRandom will always be the same
        /// </summary>
        /// <returns></returns>
        public static FRandom SeedDefault()
        {
            return new FRandom(521288629, 362436069);
        }

        /// <summary>
        /// Seed the random generator using the system clock
        /// </summary>
        /// <param name="clockNow">typically DateTime.Now is passed in</param>
        /// <returns></returns>
        public static FRandom SeedFromClock(DateTime clockNow)
        {
            return Seed((uint)(clockNow.ToFileTime() >> 16), (uint)(clockNow.ToFileTime() % 4294967296));
        }

        /// <summary>
        /// Used for generating a sequence from a single known seed. 
        /// Skip(0,...) is the same as Next, but Skip(1,...) is the same
        /// as calling Next twice but having to pass the result of the first
        /// one into the second.
        /// </summary>
        /// <param name="skip">Number of random numbers in sequence to skip</param>
        /// <param name="previous"></param>
        /// <param name="minValue"></param>
        /// <param name="maxValue"></param>
        /// <returns></returns>
        public static FRandom Skip(int skip, FRandom previous, int minValue, int maxValue)
        {
            return skip <= 0 ?
                    Next(previous, minValue, maxValue)
                    : Skip(skip - 1, Next(previous, minValue, maxValue), minValue, maxValue);
        }

        public static FRandom Next(FRandom previous, int minValue, int maxValue)
        {
            return new FRandom(NextRanged(previous, minValue, maxValue), NewU(previous.U), NewV(previous.V));
        }

        private static uint NewU(uint u)
        {
            return 36969 * (u & 65535) + (u >> 16);
        }

        private static uint NewV(uint v)
        {
            return 18000 * (v & 65535) + (v >> 16);
        }

        private static double Next(uint oldU, uint oldV)
        {
            return ((NewU(oldU) << 16) + NewV(oldV) + 1.0) * 2.328306435454494e-10;
        }

        private static int NextRanged(FRandom previous, int minValue, int maxValue)
        {
            return (int)(minValue + Next(previous.U, previous.V) * (maxValue - minValue));
        }

    }
}
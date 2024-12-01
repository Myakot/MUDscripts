function(context, args) //"target: #s.target.loc"
{
    #D("Starting script with:")
    #D("Context")
    #D(context)
    #D("Arguments")
    #D(args)
    // Check for missing parameters
    if ( !args || !args.target ) return { ok: false, msg:"missing parameters" }

    // Variable declarations
    var ez_solutions = [ "open", "unlock", "release" ]
    var colours = [ "red", "orange", "yellow", "lime", "green", "cyan", "blue", "purple" ]
    var digits = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
    var prime_numbers = [ 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97 ]
    var l0ckets = [ "tvfkyq", "vc2c7q", "uphlaw", "9p65cu", "fr8ibu", "eoq6de", "72umy0", "ellux0", "pmvr1q", "xwz7ja", "i874y3", "sa23uw" ]
    var cont = true

    args.m = call() // Initial call
    #D("---------------- Initial Call ----------------")

    // Main lock loop
    while ( cont )
    {
        // By default stop this loop if locks below NOT found
        cont = false

        cont = crack ( "EZ_21", ez_solutions )

        cont = crack ( "l0cket", l0ckets )

        if ( crack ("EZ_35", ez_solutions ) )
        {
            cont = crack ( "digit", digits )
        }

        if ( crack ("EZ_40", ez_solutions ) )
        {
            cont = crack ( "ez_prime", prime_numbers )
        }

        if ( crack ("c001", colours ) )
        { // Special handling for colour digits
            args.color_digit = args.c001.length

            // Additional call for the c002_complement
            args.m = call ()
        }

        if ( crack ("c002", colours ) )
        { // Special handling for c002_complement
            // Find the position of the correct color and set the complement 4 positions higher
            let iterator = colours.indexOf ( args.c002 )
            let c1 = iterator > 3 ? iterator - 4 : iterator + 4
            args.c002_complement = colours[ c1 ]

            // Additional handling for  c002_complement
            args.m = call ()
            cont = true
        }

        if ( crack ("c003", colours ) )
        {   // Special handling for c003_triad_1 and c003_triad_2
            // Find the position of the correct color and set triads to the right positions.
            let iterator = colours.indexOf ( args.c003 ),
            c1 = iterator > 3 ? iterator - 3 : iterator + 5,
            c2 = iterator > 4 ? iterator - 5 : iterator + 3

            args.c003_triad_1 = colours[ c1 ]
            args.c003_triad_2 = colours[ c2 ]

            // Additional handling for  c003_complement
            args.m = call ()
            cont = true
        }


        if ( args.DATA_CHECK == "" || args.m.includes( "DATA_CHECK" ) )
        { // Special handler for DATA_CHECK
            args.DATA_CHECK = ""
            args.m = args.target.call( args )
            return #D(args)
            cont = true; // Continue the process
        }
    }

    // Return all solutions in a dict
    return #D( { ok: true, args: args } )

	function call ()
  {
        // Repeat the call to try and solve it:
        let result = args.target.call ( args )
        if ( typeof result == "object" && result.ok == false && result.msg.includes( "script doesn't exist" )) return #D("loc doesn't exist")
        // Needs to be rewritten to not be called upon EVERY CALL
        return #D( result.split("\n")[ result.split("\n").length - 1 ] )
	}

	function crack ( lock, answers )
  {
        if ( args.m.includes ( lock ) )
        {
            for ( let ans of answers )
            {
                args[lock] = ans // Setting parameter to current guess

                args.m = call(args) // Repeating call for each guess

                // If we solve, return from the loop
                if ( !args.m.includes ("is not") ) return #D(true)
            }
        }
        // Else
        return false
	}
}

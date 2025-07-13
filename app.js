
        // Enhanced JavaScript with better UX
        function bntNext() {
            const input = document.getElementById("inputname");
            const username = input.value.trim();
            
            if (username.length >= 2) {
                const button = document.getElementById("bntNext");
                button.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Connecting...';
                button.disabled = true;
                input.disabled = true;
                
                document.getElementById("loader").style.display = "block";
                
                // Simulate connection process
                setTimeout(() => {
                    document.getElementById("screen1").style.display = "none";
                    document.getElementById("screen2").style.display = "block";
                    document.getElementById("username").textContent = username;
                    document.getElementById("username1").textContent = username;
                }, 2000);
            } else {
                input.classList.add("border-red-500");
                input.focus();
                setTimeout(() => {
                    input.classList.remove("border-red-500");
                }, 2000);
            }
        }
        
        function textinput() {
            const input = document.getElementById("inputname");
            if (input.value.trim().length >= 2) {
                input.classList.remove("border-red-500");
                input.classList.add("border-green-500");
            } else {
                input.classList.remove("border-green-500");
            }
        }
        
        function package(packageNumber) {
            document.getElementById("screen2").style.display = "none";
            document.getElementById("screen3").style.display = "block";
            
            const messages = [
                "Connecting to server...",
                "Authenticating user...",
                "Preparing primogems...",
                "Validating account...",
                "Processing request...",
                "Generating resources...",
                "Finalizing transaction...",
                "Almost complete..."
            ];
            
            const amounts = [2500, 5000, 9999];
            const targetAmount = amounts[packageNumber - 1];
            
            let step = 0;
            let currentAmount = 0;
            
            const messageInterval = setInterval(() => {
                if (step < messages.length) {
                    document.getElementById("processing").textContent = messages[step];
                    step++;
                } else {
                    clearInterval(messageInterval);
                    document.getElementById("loader2").style.display = "none";
                    
                    // Start counting animation
                    const countInterval = setInterval(() => {
                        currentAmount += Math.floor(targetAmount / 100);
                        if (currentAmount >= targetAmount) {
                            currentAmount = targetAmount;
                            clearInterval(countInterval);
                            
                            // Show verification
                            setTimeout(() => {
                                document.getElementById("processing").textContent = "Ready for verification!";
                                document.getElementById("verifyrequired").style.display = "block";
                                document.getElementById("verify").style.display = "block";
                            }, 500);
                        }
                        document.getElementById("resourcesGen").textContent = "+" + currentAmount.toLocaleString();
                    }, 50);
                }
            }, 800);
        }
        
        // Add package selection highlighting
        document.querySelectorAll('.package-card').forEach(card => {
            card.addEventListener('click', function() {
                document.querySelectorAll('.package-card').forEach(c => c.classList.remove('package-selected'));
                this.classList.add('package-selected');
            });
        });
        
        // Disable right-click context menu
        document.addEventListener('contextmenu', event => event.preventDefault());
        
        // Add enter key support for username input
        document.getElementById('inputname').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                bntNext();
            }
        });
        
        // Content locker integration
        $('.showContentLocker').click(function(){
            _EQ();
            return false;
        });
 

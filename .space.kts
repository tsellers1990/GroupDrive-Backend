/**
* JetBrains Space Automation
* This Kotlin-script file lets you automate build activities
* For more info, see https://www.jetbrains.com/help/space/automation.html
*/

job("Hello World!") {
    git{
        refSpec{
            +"main"
        }
        depth = UNLIMITED_DEPTH
    }
    container(displayName = "Build", image = "docker"){
        shellScript {
            content = "./auto_build.sh"
        }
    }
}

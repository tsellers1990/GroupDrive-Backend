/**
* JetBrains Space Automation
* This Kotlin-script file lets you automate build activities
* For more info, see https://www.jetbrains.com/help/space/automation.html
*/

job("Hello World!") {
    docker {
        build {
            context = "docker"
            file = "./docker/Dockerfile"
            args["HTTP_PROXY"] = "http://10.20.30.2:1234"
            labels["vendor"] = "mycompany"

            // build with another default platform. Learn more
            customPlatform = "linux/arm"
        }
    }
}


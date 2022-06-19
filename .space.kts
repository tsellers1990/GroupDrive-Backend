/**
* JetBrains Space Automation
* This Kotlin-script file lets you automate build activities
* For more info, see https://www.jetbrains.com/help/space/automation.html
*/

job("Build and Deploy Backend") {
    docker {
        build {
            file = "./Dockerfile"
            labels["vendor"] = "mycompany"
        }
        push("selrich.registry.jetbrains.space/p/groupdrive/container-artifacts/backend") {
            tags("0.0.\$JB_SPACE_EXECUTION_NUMBER")
        }
    }
    container(displayName = "Kubectl", image = "bitnami/kubectl") {
        env["k8s"] = Secrets("linode_k8s")

        shellScript {
            content = """
                mkdir ~/.kube
                echo ${'$'}k8s > ~/.kube/config
                kubectl get nodes
            """
        }
    }
}


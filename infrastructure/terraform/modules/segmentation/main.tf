resource "kubernetes_namespace" "cde" {
  metadata {
    name = "pci-cde"
    labels = {
      scope = "in-scope"
      zone  = "cde"
    }
  }
}

resource "kubernetes_network_policy" "cde_isolation" {
  metadata {
    name      = "cde-isolation-policy"
    namespace = kubernetes_namespace.cde.metadata[0].name
  }

  spec {
    pod_selector {}
    policy_types = ["Ingress", "Egress"]

    ingress {
      from {
        namespace_selector {
          match_labels = {
            zone = "cde"
          }
        }
      }
    }

    egress {
      to {
        namespace_selector {
          match_labels = {
            zone = "cde"
          }
        }
      }
      # Allow egress to KMS and SIEM endpoints specifically
    }
  }
}

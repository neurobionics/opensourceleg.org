export interface SystemComponent {
  name: string
  description: string
  type: 'controller' | 'actuator' | 'sensor' | 'power' | 'optional'
}

export const systemComponents: SystemComponent[] = [
  {
    name: "Raspberry Pi",
    description: "Central processing unit for control algorithms and sensor data processing",
    type: "controller"
  },
  {
    name: "Knee Actuator",
    description: "Motor with 9:1 gearbox for knee joint actuation (Dephy, TMotor, or MAB)",
    type: "actuator"
  },
  {
    name: "Ankle Actuator", 
    description: "Motor with 9:1 gearbox for ankle joint actuation (Dephy, TMotor, or MAB)",
    type: "actuator"
  },
  {
    name: "Knee Encoder",
    description: "High-resolution encoder for knee joint position feedback",
    type: "sensor"
  },
  {
    name: "Ankle Encoder",
    description: "High-resolution encoder for ankle joint position feedback", 
    type: "sensor"
  },
  {
    name: "Load Cell",
    description: "Force sensor for ground reaction force measurement",
    type: "sensor"
  },
  {
    name: "Battery Pack",
    description: "Rechargeable power source for the complete system",
    type: "power"
  },
  {
    name: "Additional Sensors",
    description: "IMU, EMG, or other custom sensors as needed",
    type: "optional"
  }
]

export const mermaidSystemDiagram = `
flowchart TD
    %% Central Control
    RPI("Raspberry Pi<br/>Central Controller<br/>Control Algorithms")
    
    %% Knee Joint System (Left)
    subgraph KNEE_SYSTEM [" "]
        direction TB
        KBAT("LiPo 9S<br/>Battery Pack<br/>33.3V")
        KA("Knee Actuator<br/>Motor + 9:1 Gearbox<br/>(Dephy/TMotor/MAB)")
        KBD("Knee Belt Drive<br/>Transmission System")
        KE("Knee Joint Encoder<br/>Joint Position/Velocity<br/>Feedback")
        
        KBAT --> KA
        KA --> KBD
        KA <--> KE
    end
    
    %% Ankle Joint System (Right)
    subgraph ANKLE_SYSTEM [" "]
        direction TB
        ABAT("LiPo 9S<br/>Battery Pack<br/>33.3V")
        AA("Ankle Actuator<br/>Motor + 9:1 Gearbox<br/>(Dephy/TMotor/MAB)")
        ABD("Ankle Belt Drive<br/>Transmission System")
        AE("Ankle Joint Encoder<br/>Joint Position/Velocity<br/>Feedback")
        
        ABAT --> AA
        AA --> ABD
        AA <--> AE
    end
    
    %% Central Output
    HUMAN("Human Subject<br/>Locomotion<br/>Assistance")
    
    %% Control Connections (from center to both sides)
    RPI --> KA
    RPI --> AA
    
    %% Mechanical Output (from both sides to center)
    KBD --> HUMAN
    ABD --> HUMAN
    
    %% Sensor Feedback (from both sides to center)
    KE --> RPI
    AE --> RPI
    
    %% External Sensing
    LC("Load Cell<br/>Ground Reaction<br/>Forces & Torque")
    LC --> RPI
    
    %% Optional Sensors
    AS("IMU, EMG<br/>Custom Sensors<br/>(Research Specific)")
    AS -.-> RPI
    
    %% Styling with rounded corners
    classDef electricalItem fill:#FFE5B4,stroke:#1E1C19,stroke-width:2px,color:#1E1C19,rx:15,ry:15
    classDef controlItem fill:#8594E8,stroke:#1E1C19,stroke-width:2px,color:#1E1C19,rx:15,ry:15
    classDef actuationItem fill:#CADA9D,stroke:#1E1C19,stroke-width:2px,color:#1E1C19,rx:15,ry:15
    classDef transmissionItem fill:#A8D8A8,stroke:#1E1C19,stroke-width:2px,color:#1E1C19,rx:15,ry:15
    classDef sensingItem fill:#F4C2A1,stroke:#1E1C19,stroke-width:2px,color:#1E1C19,rx:15,ry:15
    classDef mechanicalItem fill:#B8E6B8,stroke:#1E1C19,stroke-width:2px,color:#1E1C19,rx:15,ry:15
    classDef optionalItem fill:#E8E8E8,stroke:#1E1C19,stroke-width:2px,color:#1E1C19,rx:15,ry:15
    classDef jointSystem fill:#f0f0f0,stroke:#1E1C19,stroke-width:3px,rx:25,ry:25
    
    class KBAT,ABAT electricalItem
    class RPI controlItem
    class KA,AA actuationItem
    class KBD,ABD transmissionItem
    class KE,AE,LC sensingItem
    class HUMAN mechanicalItem
    class AS optionalItem
    class KNEE_SYSTEM,ANKLE_SYSTEM jointSystem
` 
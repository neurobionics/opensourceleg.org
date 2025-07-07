"use client";

import { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

export default function OpenSourceLegArchitectureDiagram() {
  const diagramRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const renderDiagram = async () => {
      if (diagramRef.current) {
        // Initialize mermaid
        mermaid.initialize({
          startOnLoad: false,
          theme: 'base',
          themeVariables: {
            primaryColor: '#f0f9ff',
            primaryTextColor: '#1f2937',
            primaryBorderColor: '#3b82f6',
            lineColor: '#6b7280',
            secondaryColor: '#f3f4f6',
            tertiaryColor: '#f9fafb',
            background: '#ffffff',
            mainBkg: '#ffffff',
            secondBkg: '#f8fafc',
            tertiaryBkg: '#f1f5f9',
            nodeBorder: '#e5e7eb',
            clusterBorder: '#d1d5db',
            defaultLinkColor: '#6b7280',
            titleColor: '#111827',
            edgeLabelBackground: '#ffffff',
            nodeTextColor: '#374151',
            fontSize: '14px',
          },
        });

        const diagramDefinition = `classDiagram
    class OpenSourceLeg {
        +tag string
        +knee ActuatorBase
        +ankle ActuatorBase
        +sensors List~SensorBase~
        +update()
        +home()
        +add_joint()
        +add_sensor()
        +start()
        +stop()
    }
    
    class ActuatorBase {
        <<abstract>>
        +tag string
        +gear_ratio float
        +frequency int
        +mode CONTROL_MODES
        +start()
        +stop()
        +update()
        +set_control_mode()
        +set_motor_voltage()
        +set_motor_current()
        +set_motor_position()
        +home()
    }
    
    class SensorBase {
        <<abstract>>
        +tag string
        +frequency int
        +is_streaming bool
        +start()
        +stop()
        +update()
    }
    
    class DephyActuator {
        +port string
        +baud_rate int
        +firmware_version string
        +motor_voltage float
        +motor_current float
        +motor_position float
        +motor_velocity float
        +case_temperature float
        +winding_temperature float
        +set_position_gains()
        +set_current_gains()
        +set_impedance_gains()
    }
    
    class TMotorActuator {
        +motor_type string
        +motor_ID int
        +position float
        +velocity float
        +torque float
        +max_mosfett_temp float
        +power_on()
        +power_off()
    }
    
    class CustomActuator {
        +custom_property string
        +custom_method()
        +implement_control_mode()
        +custom_calibration()
    }
    
    class AS5048B {
        +bus string
        +A1_adr_pin bool
        +A2_adr_pin bool
        +zero_position int
        +position float
        +velocity float
        +abs_ang float
        +set_zero_position()
    }
    
    class DephyLoadcellAmplifier {
        +amp_gain float
        +exc float
        +bus int
        +i2c_address int
        +fx float
        +fy float
        +fz float
        +mx float
        +my float
        +mz float
    }
    
    class CustomSensor {
        +custom_property string
        +custom_data_type string
        +custom_method()
        +process_custom_data()
    }
    
    OpenSourceLeg o-- ActuatorBase : contains
    OpenSourceLeg o-- SensorBase : contains
    
    ActuatorBase <|-- DephyActuator
    ActuatorBase <|-- TMotorActuator
    ActuatorBase <|-- CustomActuator
    
    SensorBase <|-- AS5048B
    SensorBase <|-- DephyLoadcellAmplifier
    SensorBase <|-- CustomSensor
    
    note "or any custom robot class built on base class signatures"`;

        try {
          // Clear the container
          diagramRef.current.innerHTML = '';
          
          // Render the diagram
          const { svg } = await mermaid.render('opensourceleg-class-diagram', diagramDefinition);
          diagramRef.current.innerHTML = svg;
        } catch (error) {
          console.error('Error rendering Mermaid diagram:', error);
          diagramRef.current.innerHTML = `<p class="text-red-500">Error rendering diagram: ${error}</p>`;
        }
      }
    };

    renderDiagram();
  }, []);

  return (
    <div className="w-full bg-transparent">
      <div 
        ref={diagramRef} 
        className="w-full overflow-x-auto flex justify-center"
        style={{ minHeight: '600px' }}
      />
      <p className="text-xs text-gray-600 mt-4 text-center italic">
        Class diagram demonstrating the architecture and extensibility of the opensourceleg library.
        </p>
    </div>
  );
} 
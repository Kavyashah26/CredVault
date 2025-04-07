"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "@/hooks/use-toast"
import { AlertCircle, Lock, Eye, EyeOff, Key, RefreshCw, Shield, Users, Folder, FileText, Loader } from "lucide-react"
import { usePathname } from 'next/navigation';

export default function NewProjectPage() {
  const router = useRouter()

  const [projectSettings, setProjectSettings] = useState({
    name: "",
    description: "",
    credentials: {
      rotationPolicy: "manual",
      rotationInterval: 10,
      masterKey: "",
    },
    logging: {
      enableAuditLog: true,
      logRetentionPeriod: 30,
      alertOnCriticalEvents: true,
    },
  })

  const [errors, setErrors] = useState({
    name: "",
    description: "",
    masterKey: "",
    rotationInterval: "",
    logRetentionPeriod: "",
  })

  const [showMasterKey, setShowMasterKey] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const pathname = usePathname();
  const handleInputChange = (section: string, key: string, value: any) => {
    setProjectSettings((prev) => ({
      ...prev,
      [section]: {
        ...(prev as any)[section],
        [key]: key === "rotationInterval" ? Number(value) || 0 : value,
      },
    }))
  }

  const validateForm = () => {
    let isValid = true
    const newErrors = { ...errors }

    if (projectSettings.name.trim().length === 0) {
      newErrors.name = "Project name is required"
      isValid = false
    } else {
      newErrors.name = ""
    }

    if (projectSettings.description.trim().length === 0) {
      newErrors.description = "Project description is required"
      isValid = false
    } else {
      newErrors.description = ""
    }

    if (
      projectSettings.credentials.rotationPolicy === "manual" &&
      projectSettings.credentials.masterKey.trim().length === 0
    ) {
      newErrors.masterKey = "Master key is required for manual rotation"
      isValid = false
    } else {
      newErrors.masterKey = ""
    }

    if (projectSettings.credentials.rotationPolicy === "automatic") {
      if (projectSettings.credentials.rotationInterval < 1 || projectSettings.credentials.rotationInterval > 365) {
        newErrors.rotationInterval = "Rotation interval must be between 1 and 365 days"
        isValid = false
      } else if (projectSettings.credentials.rotationInterval > 90) {
        newErrors.rotationInterval = "Warning: Rotation interval greater than 90 days may pose security risks"
      } else {
        newErrors.rotationInterval = ""
      }
    }

    if (isNaN(projectSettings.logging.logRetentionPeriod) || projectSettings.logging.logRetentionPeriod < 30) {
      newErrors.logRetentionPeriod = "Log retention period must be a valid number of at least 30 days"
      isValid = false
    } else if (projectSettings.logging.logRetentionPeriod > 3650) {
      newErrors.logRetentionPeriod = "Log retention period cannot exceed 3650 days (10 years)"
      isValid = false
    } else if (projectSettings.logging.logRetentionPeriod < 90) {
      newErrors.logRetentionPeriod =
        "Warning: Log retention period less than 90 days may not meet compliance requirements"
    } else {
      newErrors.logRetentionPeriod = ""
    }

    if (isNaN(projectSettings.credentials.rotationInterval) || projectSettings.credentials.rotationInterval < 10) {
      newErrors.rotationInterval = "Rotation interval must be a valid number greater than 10"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please correct the errors in the form.",
        variant: "destructive",
      })
      return
    }
    setIsLoading(true) 

  // Extract the orgid using split or regex
  const parts = pathname.split('/');
  const orgID = parts.includes('organization') ? parts[parts.indexOf('organization') + 1]:0;
    
     try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1]

      // Prepare the data to be sent
      const dataToSend = {
        ...projectSettings,
        credentials: {
          rotationPolicy: projectSettings.credentials.rotationPolicy,
          rotationInterval: projectSettings.credentials.rotationInterval,
          ...(projectSettings.credentials.rotationPolicy === "manual" && {
            masterKey: projectSettings.credentials.masterKey,
          }),
        },
      }

      const response = await fetch(`${process.env.BACKEND_API_URL}/api/organizations/${orgID}/projects`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dataToSend),
      })

      if (!response.ok) {
        throw new Error("Failed to create project")
      }

      const data = await response.json()
      console.log("Project created:", data)
      toast({
        title: "Project Created",
        description: `${projectSettings.name} has been successfully created.`,
      })
      router.push("/dashboard")
    } catch (error) {
      console.error("Error creating project:", error)
      toast({
        title: "Error",
        description: "Failed to create project. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Create New Project</h1>
      <form onSubmit={handleSubmit}>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Project Details</CardTitle>
            <CardDescription>Provide basic information about your project</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="projectName">Project Name</Label>
              <Input
                id="projectName"
                value={projectSettings.name}
                onChange={(e) => setProjectSettings((prev) => ({ ...prev, name: e.target.value }))}
                required
              />
              {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="projectDescription">Project Description</Label>
              <Textarea
                id="projectDescription"
                value={projectSettings.description}
                onChange={(e: { target: { value: any } }) =>
                  setProjectSettings((prev) => ({ ...prev, description: e.target.value }))
                }
                rows={4}
              />
              {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="credentials" className="mb-6">
          <TabsList>
            <TabsTrigger value="credentials">Credentials</TabsTrigger>
            <TabsTrigger value="logging">Logging</TabsTrigger>
          </TabsList>

          <TabsContent value="credentials">
            <Card>
              <CardHeader>
                <CardTitle>Credential Management</CardTitle>
                <CardDescription>Set up how credentials are managed in your project</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Credential Rotation Policy</Label>
                  <RadioGroup
                    value={projectSettings.credentials.rotationPolicy}
                    onValueChange={(value) => handleInputChange("credentials", "rotationPolicy", value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="manual" id="manual" />
                      <Label htmlFor="manual">Manual</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="automatic" id="automatic" />
                      <Label htmlFor="automatic">Automatic</Label>
                    </div>
                  </RadioGroup>
                </div>

                {projectSettings.credentials.rotationPolicy === "manual" && (
                  <div className="space-y-2">
                    <Label htmlFor="masterKey">Set Up Master Key</Label>
                    <div className="relative">
                      <Input
                        id="masterKey"
                        type={showMasterKey ? "text" : "password"}
                        value={projectSettings.credentials.masterKey || ""}
                        onChange={(e) => handleInputChange("credentials", "masterKey", e.target.value)}
                        placeholder="Enter your master key"
                      />
                      <button
                        type="button"
                        onClick={() => setShowMasterKey(!showMasterKey)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                      >
                        {showMasterKey ? (
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-400" />
                        )}
                      </button>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Ensure your master key is secure and known only to you.
                    </p>
                    {errors.masterKey && <p className="text-sm text-red-500">{errors.masterKey}</p>}
                  </div>
                )}
                {projectSettings.credentials.rotationPolicy === "automatic" && (
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      We will generate a master key for you and rotate it automatically.
                    </p>
                    <div className="space-y-2">
                      <Label htmlFor="rotationInterval">Rotation Interval (days)</Label>
                      <Input
                        id="rotationInterval"
                        type="number"
                        value={projectSettings.credentials.rotationInterval}
                        onChange={(e) =>
                          handleInputChange("credentials", "rotationInterval", Number.parseInt(e.target.value))
                        }
                        min={10}
                        max={365}
                      />
                      {errors.rotationInterval && (
                        <p
                          className={`text-sm ${errors.rotationInterval.startsWith("Warning") ? "text-yellow-500" : "text-red-500"}`}
                        >
                          {errors.rotationInterval}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="logging">
            <Card>
              <CardHeader>
                <CardTitle>Logging and Auditing</CardTitle>
                <CardDescription>Configure logging and auditing settings for your project</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="logRetentionPeriod">Log Retention Period (days)</Label>
                  <Input
                    id="logRetentionPeriod"
                    type="number"
                    value={projectSettings.logging.logRetentionPeriod}
                    onChange={(e) => handleInputChange("logging", "logRetentionPeriod", Number(e.target.value))}
                    min={30}
                    max={3650}
                    step={1}
                  />
                  {errors.logRetentionPeriod && (
                    <p
                      className={`text-sm ${
                        errors.logRetentionPeriod.startsWith("Warning") ? "text-yellow-500" : "text-red-500"
                      }`}
                    >
                      {errors.logRetentionPeriod}
                    </p>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="alertOnCriticalEvents">Alert on Critical Events</Label>
                  <Switch
                    id="alertOnCriticalEvents"
                    checked={projectSettings.logging.alertOnCriticalEvents}
                    onCheckedChange={(checked) => handleInputChange("logging", "alertOnCriticalEvents", checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end space-x-4">
          <Button variant="outline" onClick={() => router.push("/dashboard")}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              "Create Project"
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}


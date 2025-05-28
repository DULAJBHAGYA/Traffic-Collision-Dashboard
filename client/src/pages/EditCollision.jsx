import React, { useState, useEffect } from 'react';
import { ArrowLeft, Save, CheckCircle, AlertCircle } from 'lucide-react';
import { useNavigate, useParams } from "react-router-dom";

const EditCollision = ({ onSave, onBack }) => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    statisticCode: '',
    statisticLabel: '',
    year: new Date().getFullYear(),
    monthCode: '',
    monthName: '',
    unit: 'Number',
    value: ''
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(''); 
  const [modalMessage, setModalMessage] = useState('');
  const [isFetching, setIsFetching] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCollisionData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/collisions/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch collision data');
        }
        const data = await response.json();
        
        setFormData({
          statisticCode: data.statisticCode,
          statisticLabel: data.statisticLabel,
          year: data.year,
          monthCode: data.monthCode,
          monthName: data.monthName,
          unit: data.unit,
          value: data.value
        });
      } catch (error) {
        console.error('Error fetching collision data:', error);
        setModalType('error');
        setModalMessage('Failed to load collision record. Please try again.');
        setShowModal(true);
      } finally {
        setIsFetching(false);
      }
    };

    fetchCollisionData();
  }, [id]);

  const handleBack = () => {
    navigate("/collisions");
  };

  const monthOptions = [
    { value: '-', label: 'All months' },
    { value: '1', label: 'January' },
    { value: '2', label: 'February' },
    { value: '3', label: 'March' },
    { value: '4', label: 'April' },
    { value: '5', label: 'May' },
    { value: '6', label: 'June' },
    { value: '7', label: 'July' },
    { value: '8', label: 'August' },
    { value: '9', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' },
  ];

  const unitOptions = ['Number', 'Percentage', 'Rate', 'Count', 'Index'];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.statisticCode.trim()) {
      newErrors.statisticCode = 'Statistic code is required';
    } else if (formData.statisticCode.length < 2 || formData.statisticCode.length > 50) {
      newErrors.statisticCode = 'Statistic code must be between 2 and 50 characters';
    } else if (!/^[A-Z0-9-_]+$/.test(formData.statisticCode)) {
      newErrors.statisticCode = 'Statistic code can only contain uppercase letters, numbers, hyphens, and underscores';
    }

    if (!formData.statisticLabel.trim()) {
      newErrors.statisticLabel = 'Statistic label is required';
    } else if (formData.statisticLabel.length < 5 || formData.statisticLabel.length > 200) {
      newErrors.statisticLabel = 'Statistic label must be between 5 and 200 characters';
    }

    if (!formData.year || formData.year < 1900 || formData.year > 2100) {
      newErrors.year = 'Please enter a valid year between 1900 and 2100';
    }

    if (!formData.monthName) {
      newErrors.monthName = 'Month is required';
    }

    if (!formData.unit) {
      newErrors.unit = 'Unit is required';
    } else if (!['Number', 'Percentage', 'Rate', 'Count', 'Index'].includes(formData.unit)) {
      newErrors.unit = 'Unit must be one of: Number, Percentage, Rate, Count, Index';
    }

    if (!formData.value && formData.value !== 0) {
      newErrors.value = 'Value is required';
    } else if (isNaN(formData.value) || formData.value < 0) {
      newErrors.value = 'Please enter a valid positive number';
    } else if (formData.value > 999999) {
      newErrors.value = 'Value must not exceed 999,999';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      const selectedMonth = monthOptions.find(month => month.label === formData.monthName);
      
      const dataToUpdate = {
        statisticCode: formData.statisticCode,
        statisticLabel: formData.statisticLabel,
        year: parseInt(formData.year),
        monthCode: selectedMonth ? selectedMonth.value : '-',
        monthName: formData.monthName,
        unit: formData.unit,
        value: parseInt(formData.value)
      };

      const response = await fetch(`http://localhost:8080/api/collisions/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToUpdate)
      });

      if (response.ok) {
        const updatedData = await response.json();
        setModalType('success');
        setModalMessage('Collision record updated successfully!');
        setShowModal(true);
        
        if (onSave) {
          onSave(updatedData);
        }
      } else {
        const errorData = await response.json();
        setModalType('error');
        
        if (errorData.errors && typeof errorData.errors === 'object') {
          const backendErrors = {};
          Object.keys(errorData.errors).forEach(field => {
            backendErrors[field] = errorData.errors[field];
          });
          setErrors(backendErrors);
          setModalMessage('Please fix the validation errors and try again.');
        } else if (errorData.error) {
          setModalMessage(errorData.error);
        } else {
          setModalMessage(errorData.message || `Failed to update record: ${response.status} ${response.statusText}`);
        }
        
        setShowModal(true);
      }
    } catch (error) {
      console.error('Error updating data:', error);
      setModalType('error');
      setModalMessage('Network error occurred. Please check your connection and try again.');
      setShowModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const Modal = ({ show, onClose, type, message }) => {
    if (!show) return null;

    return (
      <div className="fixed inset-0 backdrop-blur-sm bg-white/30 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
          <div className="flex items-center space-x-3 mb-4">
            {type === 'success' ? (
              <CheckCircle className="w-6 h-6 text-green-500" />
            ) : (
              <AlertCircle className="w-6 h-6 text-red-500" />
            )}
            <h3 className={`text-lg font-semibold ${type === 'success' ? 'text-green-800' : 'text-red-800'}`}>
              {type === 'success' ? 'Success' : 'Error'}
            </h3>
          </div>
          <p className="text-gray-700 mb-6">{message}</p>
          <div className="flex justify-end">
            <button
              onClick={handleBack}
              className={`px-4 py-2 rounded-lg text-white font-medium ${
                type === 'success' 
                  ? 'bg-green-600 hover:bg-green-700' 
                  : 'bg-red-600 hover:bg-red-700'
              } transition-colors`}
            >
              OK
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (isFetching) {
    return (
      <div className="h-full w-full bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-700">Loading collision record...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleBack}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Statistics</span>
            </button>
            <div className="h-6 w-px bg-gray-300"></div>
            <h1 className="text-xl font-semibold text-gray-800">
              Edit Collision Record
            </h1>
          </div>
        </div>
      </div>

      <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mx-auto" style={{ maxWidth: '1200px' }}>
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Record Details</h2>
            <p className="text-sm text-gray-600 mt-1">
              Update the details for the statistics record. All fields marked with * are required.
            </p>
          </div>

          <div className="p-4 sm:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Statistic Code *
                </label>
                <input
                  type="text"
                  value={formData.statisticCode}
                  onChange={(e) => handleInputChange('statisticCode', e.target.value.toUpperCase())}
                  placeholder="e.g., PED2023, ALC-STAT, QTR-2023"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.statisticCode ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.statisticCode && (
                  <p className="mt-1 text-sm text-red-600">{errors.statisticCode}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Statistic Label *
                </label>
                <input
                  type="text"
                  value={formData.statisticLabel}
                  onChange={(e) => handleInputChange('statisticLabel', e.target.value)}
                  placeholder="e.g., Pedestrian Injury Collisions, Impaired Driving Collisions"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.statisticLabel ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.statisticLabel && (
                  <p className="mt-1 text-sm text-red-600">{errors.statisticLabel}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Year *
                </label>
                <input
                  type="number"
                  value={formData.year}
                  onChange={(e) => handleInputChange('year', parseInt(e.target.value) || '')}
                  min="1900"
                  max="2100"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.year ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.year && (
                  <p className="mt-1 text-sm text-red-600">{errors.year}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Month of Year *
                </label>
                <select
                  value={formData.monthName}
                  onChange={(e) => handleInputChange('monthName', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.monthName ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select Month</option>
                  {monthOptions.map((option) => (
                    <option key={option.value} value={option.label}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {errors.monthName && (
                  <p className="mt-1 text-sm text-red-600">{errors.monthName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Unit *
                </label>
                <select
                  value={formData.unit}
                  onChange={(e) => handleInputChange('unit', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.unit ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  {unitOptions.map((unit) => (
                    <option key={unit} value={unit}>
                      {unit}
                    </option>
                  ))}
                </select>
                {errors.unit && (
                  <p className="mt-1 text-sm text-red-600">{errors.unit}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Value *
                </label>
                <input
                  type="number"
                  value={formData.value}
                  onChange={(e) => handleInputChange('value', e.target.value)}
                  placeholder="e.g., 58, 93, 842"
                  min="0"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.value ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.value && (
                  <p className="mt-1 text-sm text-red-600">{errors.value}</p>
                )}
              </div>
            </div>

            <div className="flex justify-end mt-8 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isLoading}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 transition-colors"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Updating...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Update Record</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <Modal 
        show={showModal} 
        onClose={closeModal} 
        type={modalType} 
        message={modalMessage} 
      />
    </div>
  );
};

export default EditCollision;